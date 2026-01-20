import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateArtikelDto } from './dto/create-artikel.dto';
import { UpdateArtikelDto } from './dto/update-artikel.dto';

@Injectable()
export class ArtikelService {
  constructor(private prisma: PrismaService) {}

  private readonly supportedLangs = ['de', 'en', 'fr', 'it'] as const;
  private readonly deeplLangMap = {
    de: 'DE',
    en: 'EN',
    fr: 'FR',
    it: 'IT',
  } as const;

  private normalizeLang(
    value?: string,
  ): (typeof this.supportedLangs)[number] | undefined {
    if (value && this.supportedLangs.includes(value as (typeof this.supportedLangs)[number])) {
      return value as (typeof this.supportedLangs)[number];
    }

    return undefined;
  }

  private getDeeplConfig() {
    const apiKey = process.env.DEEPL_API_KEY;
    if (!apiKey) {
      throw new Error('DEEPL_API_KEY is not set');
    }

    return {
      apiKey,
      apiUrl: process.env.DEEPL_API_URL ?? 'https://api-free.deepl.com/v2/translate',
    };
  }

  private async translateMarkdown(
    text: string,
    sourceLang: 'DE' | 'EN' | 'FR' | 'IT' | undefined,
    targetLang: 'DE' | 'EN' | 'FR' | 'IT',
  ): Promise<{ text: string; detectedSourceLang?: 'DE' | 'EN' | 'FR' | 'IT' }> {
    const { apiKey, apiUrl } = this.getDeeplConfig();
    const body = new URLSearchParams({
      auth_key: apiKey,
      text,
      target_lang: targetLang,
    });
    if (sourceLang) {
      body.set('source_lang', sourceLang);
    }

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`DeepL error (${response.status}): ${errorText}`);
    }

    const data = (await response.json()) as {
      translations?: { text: string; detected_source_language?: 'DE' | 'EN' | 'FR' | 'IT' }[];
    };

    const first = data.translations?.[0];
    if (!first?.text) {
      throw new Error('DeepL returned empty translation');
    }

    return {
      text: first.text,
      detectedSourceLang: first.detected_source_language,
    };
  }

  private async buildTranslationFields(
    markdownText: string,
    sourceLang?: (typeof this.supportedLangs)[number],
  ) {
    const targets = this.supportedLangs;
    let effectiveSourceLang = sourceLang;
    if (!effectiveSourceLang) {
      const detection = await this.translateMarkdown(markdownText, undefined, 'EN');
      const detected = detection.detectedSourceLang;
      if (detected) {
        const mapped = Object.entries(this.deeplLangMap).find(
          ([, value]) => value === detected,
        )?.[0] as (typeof this.supportedLangs)[number] | undefined;
        effectiveSourceLang = mapped;
      }
    }

    const translated = await Promise.all(
      targets.map(async (target) => {
        if (effectiveSourceLang && target === effectiveSourceLang) {
          return markdownText;
        }

        const source = effectiveSourceLang
          ? this.deeplLangMap[effectiveSourceLang]
          : undefined;
        const { text } = await this.translateMarkdown(
          markdownText,
          source,
          this.deeplLangMap[target],
        );
        return text;
      }),
    );

    return {
      markdownTextDe: translated[0],
      markdownTextEn: translated[1],
      markdownTextFr: translated[2],
      markdownTextIt: translated[3],
    };
  }

  async create(createArtikelDto: CreateArtikelDto) {
    const sourceLang = this.normalizeLang(createArtikelDto.lang);
    const translations = await this.buildTranslationFields(
      createArtikelDto.markdownText,
      sourceLang,
    );

    return this.prisma.artikel.create({
      data: {
        ...createArtikelDto,
        ...translations,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
  }

  async findAll() {
    return this.prisma.artikel.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: number) {
    const artikel = await this.prisma.artikel.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    if (!artikel) {
      throw new NotFoundException(`Artikel with ID ${id} not found`);
    }

    return artikel;
  }

  async update(id: number, updateArtikelDto: UpdateArtikelDto) {
    await this.findOne(id); // Check if exists

    const updateData = { ...updateArtikelDto };
    if (updateArtikelDto.markdownText) {
      const sourceLang = this.normalizeLang(updateArtikelDto.lang);
      const translations = await this.buildTranslationFields(
        updateArtikelDto.markdownText,
        sourceLang,
      );
      Object.assign(updateData, translations);
    }

    return this.prisma.artikel.update({
      where: { id },
      data: updateData,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
  }

  async remove(id: number) {
    await this.findOne(id); // Check if exists

    return this.prisma.artikel.delete({
      where: { id },
    });
  }
}
