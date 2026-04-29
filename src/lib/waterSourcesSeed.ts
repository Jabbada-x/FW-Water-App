import type { WaterSource } from '@/lib/types';

export const WATER_SOURCES_SEED: WaterSource[] = [
  {
    id: '1',
    name: 'UH-12',
    type: 'unterflurhydrant',
    latitude: 50.112,
    longitude: 8.682,
    capacity_l_min: 1200,
    status: 'aktiv',
    notes: null,
    last_checked_at: '2026-03-11'
  },
  {
    id: '2',
    name: 'Löschteich Nord',
    type: 'loeschteich',
    latitude: 50.11,
    longitude: 8.69,
    capacity_l_min: 2000,
    status: 'eingeschraenkt',
    notes: 'Zufahrt eng',
    last_checked_at: '2026-01-05'
  },
  {
    id: '3',
    name: 'Zisterne Bauhof',
    type: 'zisterne',
    latitude: 50.115,
    longitude: 8.676,
    capacity_l_min: 800,
    status: 'ausser_betrieb',
    notes: 'Pumpe defekt',
    last_checked_at: '2025-12-09'
  }
];
