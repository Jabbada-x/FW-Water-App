insert into hose_types (name, diameter_mm, pressure_loss_table, active) values
('B', 75, '{"400": 0.5, "800": 1.2, "1200": 2.4}', true),
('C42', 42, '{"200": 0.8, "400": 2.1, "800": 7.8}', true),
('C52', 52, '{"200": 0.4, "400": 1.2, "800": 4.3}', true),
('A', 110, '{"800": 0.3, "1200": 0.7, "1600": 1.1}', true),
('F', 150, '{"1200": 0.2, "2000": 0.5, "3000": 1.0}', true);

insert into app_settings (key, value) values
('pressure.height_bar_per_10m', '1'),
('routing.mode.default', '"route"');
