export type Role = 'admin' | 'user';

export type WaterSourceType =
  | 'unterflurhydrant'
  | 'ueberflurhydrant'
  | 'loeschteich'
  | 'zisterne'
  | 'offenes_gewaesser'
  | 'sonstige';

export type WaterSourceStatus = 'aktiv' | 'eingeschraenkt' | 'ausser_betrieb';

export interface WaterSource {
  id: string;
  name: string;
  type: WaterSourceType;
  latitude: number;
  longitude: number;
  capacity_l_min: number;
  status: WaterSourceStatus;
  notes: string | null;
  last_checked_at: string | null;
}

export interface HoseType {
  id: string;
  name: string;
  diameter_mm: number;
  pressure_loss_table: Record<string, number>;
  active: boolean;
}
