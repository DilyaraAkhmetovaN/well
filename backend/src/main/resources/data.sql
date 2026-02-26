INSERT INTO users (email, password, full_name, role, enabled, created_at)
SELECT 'admin@well.local', '$2a$10$R9MgV6Xw2dQ2xGMS81Fz6Oj09QJkOV1nP9x5fC8IRqzjKCVjO8FQm', 'System Admin', 'ROLE_ADMIN', true, NOW()
WHERE NOT EXISTS (SELECT 1 FROM users WHERE email='admin@well.local');
