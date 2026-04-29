insert into auth.users (id, email) values
('11111111-1111-1111-1111-111111111111', 'admin@feuerwehr.local'),
('22222222-2222-2222-2222-222222222222', 'einsatz@feuerwehr.local')
on conflict do nothing;

insert into profiles (id, name, email, role) values
('11111111-1111-1111-1111-111111111111', 'Admin User', 'admin@feuerwehr.local', 'admin'),
('22222222-2222-2222-2222-222222222222', 'Einsatzkraft', 'einsatz@feuerwehr.local', 'user')
on conflict do nothing;

insert into water_sources (name, type, latitude, longitude, capacity_l_min, status, notes, last_checked_at) values
('UH-12', 'unterflurhydrant', 50.112, 8.682, 1200, 'aktiv', null, '2026-03-11'),
('Löschteich Nord', 'loeschteich', 50.110, 8.690, 2000, 'eingeschraenkt', 'Zufahrt eng', '2026-01-05'),
('Zisterne Bauhof', 'zisterne', 50.115, 8.676, 800, 'ausser_betrieb', 'Pumpe defekt', '2025-12-09');

insert into hose_types (name, diameter_mm, pressure_loss_table, active) values
('B', 75, '{"400": 0.5, "800": 1.2, "1200": 2.4}', true),
('C42', 42, '{"200": 0.8, "400": 2.1, "800": 7.8}', true),
('C52', 52, '{"200": 0.4, "400": 1.2, "800": 4.3}', true),
('A', 110, '{"800": 0.3, "1200": 0.7, "1600": 1.1}', true),
('F', 150, '{"1200": 0.2, "2000": 0.5, "3000": 1.0}', true)
on conflict do nothing;

insert into app_settings (key, value) values
('pressure.height_bar_per_10m', '1'),
('routing.mode.default', '"route"')
on conflict do nothing;
