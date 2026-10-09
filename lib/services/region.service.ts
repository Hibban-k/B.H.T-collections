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

export class RegionService {
  /**
   * Retrieves all regions. Set includeInactive to true for the admin panel.
   */
  static async getRegions(includeInactive = false): Promise<SerializedRegion[]> {
    return RegionRepository.findAll(includeInactive);
  }

  static async getRegionById(id: string): Promise<SerializedRegion | null> {
    return RegionRepository.findById(id);
  }

  static async getRegionByCode(code: string): Promise<SerializedRegion | null> {
    return RegionRepository.findByCode(code);
  }

  static async createRegion(input: CreateRegionInput): Promise<SerializedRegion> {
    const data: Partial<IRegion> = {
      name: input.name,
      code: input.code.toLowerCase(),
      currency: input.currency || "AED",
      isActive: input.isActive !== undefined ? input.isActive : true,
      metaTitleSuffix: input.metaTitleSuffix || "",
      metaDescriptionTemplate: input.metaDescriptionTemplate || "",
    };
    return RegionRepository.create(data);
  }

  static async updateRegion(id: string, input: Partial<CreateRegionInput>): Promise<SerializedRegion | null> {
    const data: UpdateQuery<IRegion> = {};
    if (input.name !== undefined) data.name = input.name;
    if (input.code !== undefined) data.code = input.code.toLowerCase();
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
