-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id BIGSERIAL PRIMARY KEY,
    login VARCHAR(50) NOT NULL UNIQUE,
    hashed_password VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    deleted BOOLEAN NOT NULL DEFAULT false
);

-- Create user_roles table
CREATE TABLE IF NOT EXISTS user_roles (
    user_id BIGINT NOT NULL,
    role VARCHAR(50) NOT NULL,
    PRIMARY KEY (user_id, role),
    CONSTRAINT fk_user_roles_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_users_login ON users (login);
CREATE INDEX IF NOT EXISTS idx_users_email ON users (email);
CREATE INDEX IF NOT EXISTS idx_user_roles_user_id ON user_roles (user_id);

-- Insert initial admin user (password is already hashed)
-- Default password is 'admin123' (hashed)
INSERT INTO users (login, hashed_password, email, first_name, last_name, active, created_at, updated_at, deleted)
SELECT 'admin', '$2a$10$XptfskLsT1SL/bOzZLzJLeHBLz1BLZ1Lk1AEJDFkpJDqLszKuCVDK', 'admin@example.com', 'Admin', 'User', true, NOW(), NOW(), false
WHERE NOT EXISTS (SELECT 1 FROM users WHERE login = 'admin');

-- Assign admin role to the admin user
INSERT INTO user_roles (user_id, role)
SELECT id, 'ADMIN' FROM users WHERE login = 'admin' AND NOT EXISTS (
    SELECT 1 FROM user_roles WHERE user_id = (SELECT id FROM users WHERE login = 'admin') AND role = 'ADMIN'
);

-- Insert initial regular user (password is already hashed)
-- Default password is 'user123' (hashed)
INSERT INTO users (login, hashed_password, email, first_name, last_name, active, created_at, updated_at, deleted)
SELECT 'user', '$2a$10$XptfskLsT1SL/bOzZLzJLeHBLz1BLZ1Lk1AEJDFkpJDqLszKuCVDK', 'user@example.com', 'Test', 'User', true, NOW(), NOW(), false
WHERE NOT EXISTS (SELECT 1 FROM users WHERE login = 'user');

-- Assign user role to the regular user
INSERT INTO user_roles (user_id, role)
SELECT id, 'USER' FROM users WHERE login = 'user' AND NOT EXISTS (
    SELECT 1 FROM user_roles WHERE user_id = (SELECT id FROM users WHERE login = 'user') AND role = 'USER'
);
