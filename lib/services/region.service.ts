import { isStoreMarket } from "@/lib/seo/locales";
import { cache } from "react";
import { RegionRepository, SerializedRegion } from "@/lib/repositories/region.repository";
import type { IRegion } from "@/lib/db/models/Region";
import type { UpdateQuery } from "mongoose";

export interface CreateRegionInput {
  name: string;
  code: string;
  currency?: string;
  isActive?: boolean;
  metaTitleSuffix?: string;
  metaDescriptionTemplate?: string;
}

const readRegions = cache((includeInactive: boolean) => RegionRepository.findAll(includeInactive));
const readRegion = cache((code: string) => RegionRepository.findByCode(code));

export class RegionService {
  /**
   * Retrieves all regions. Set includeInactive to true for the admin panel.
   */
  static async getRegions(includeInactive = false): Promise<SerializedRegion[]> {
    return readRegions(includeInactive);
  }

  static async getRegionById(id: string): Promise<SerializedRegion | null> {
    return RegionRepository.findById(id);
  }

  static async getRegionByCode(code: string): Promise<SerializedRegion | null> {
    return readRegion(code);
  }

  static async createRegion(input: CreateRegionInput): Promise<SerializedRegion> {
    const trimmedName = input.name.trim();
    const existingName = await RegionRepository.findByName(trimmedName);
    if (existingName) {
      throw new Error(`Region with name "${trimmedName}" already exists.`);
    }

    const trimmedCode = input.code.trim().toLowerCase();
    if (!isStoreMarket(trimmedCode)) throw new Error("Invalid region code. Use ae, sa, qa, kw, bh or om; en is the international route.");
    const existingCode = await RegionRepository.findByCode(trimmedCode);
    if (existingCode) {
      throw new Error(`Region with code "${trimmedCode}" already exists.`);
    }

    const data: Partial<IRegion> = {
      name: trimmedName,
      code: trimmedCode,
      currency: input.currency || "AED",
      isActive: input.isActive !== undefined ? input.isActive : true,
      metaTitleSuffix: input.metaTitleSuffix || "",
      metaDescriptionTemplate: input.metaDescriptionTemplate || "",
    };
    return RegionRepository.create(data);
  }

  static async updateRegion(id: string, input: Partial<CreateRegionInput>): Promise<SerializedRegion | null> {
    if (input.name) {
      const existingName = await RegionRepository.findByName(input.name.trim(), id);
      if (existingName) {
        throw new Error(`Region with name "${input.name.trim()}" already exists.`);
      }
    }
    if (input.code !== undefined && !isStoreMarket(input.code.trim().toLowerCase())) {
      throw new Error("Invalid region code. Use ae, sa, qa, kw, bh or om.");
    }
    if (input.code) {
      const existingCode = await RegionRepository.findByCode(input.code.trim().toLowerCase(), id);
      if (existingCode) {
        throw new Error(`Region with code "${input.code.trim().toLowerCase()}" already exists.`);
      }
    }

    const data: UpdateQuery<IRegion> = {};
    if (input.name !== undefined) data.name = input.name.trim();
    if (input.code !== undefined) data.code = input.code.trim().toLowerCase();
    if (input.currency !== undefined) data.currency = input.currency;
    if (input.isActive !== undefined) data.isActive = input.isActive;
    if (input.metaTitleSuffix !== undefined) data.metaTitleSuffix = input.metaTitleSuffix;
    if (input.metaDescriptionTemplate !== undefined) data.metaDescriptionTemplate = input.metaDescriptionTemplate;

    return RegionRepository.update(id, data);
  }

  static async deleteRegion(id: string): Promise<boolean> {
    return RegionRepository.delete(id);
  }
}
