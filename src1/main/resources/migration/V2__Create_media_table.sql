-- Create media table
CREATE TABLE IF NOT EXISTS media (
    id BIGSERIAL PRIMARY KEY,
    original_name VARCHAR(255) NOT NULL,
    file_name VARCHAR(255) NOT NULL UNIQUE,
    file_type VARCHAR(100) NOT NULL,
    file_size BIGINT NOT NULL,
    file_path TEXT NOT NULL,
    url TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL,
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE
);

-- Add index for better performance on common queries
CREATE INDEX IF NOT EXISTS idx_media_file_name ON media(file_name);
CREATE INDEX IF NOT EXISTS idx_media_file_type ON media(file_type);
CREATE INDEX IF NOT EXISTS idx_media_created_at ON media(created_at);
CREATE INDEX IF NOT EXISTS idx_media_is_deleted ON media(is_deleted);

-- Add comments for documentation
COMMENT ON TABLE media IS 'Stores information about uploaded media files';
COMMENT ON COLUMN media.original_name IS 'Original name of the uploaded file';
COMMENT ON COLUMN media.file_name IS 'Generated unique file name';
COMMENT ON COLUMN media.file_type IS 'MIME type of the file';
COMMENT ON COLUMN media.file_size IS 'Size of the file in bytes';
COMMENT ON COLUMN media.file_path IS 'Relative path to the file in the storage';
COMMENT ON COLUMN media.url IS 'Public URL to access the file';
COMMENT ON COLUMN media.created_at IS 'Timestamp when the record was created';
COMMENT ON COLUMN media.updated_at IS 'Timestamp when the record was last updated';
COMMENT ON COLUMN media.is_deleted IS 'Soft delete flag';

-- Create a function to update the updated_at column automatically
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create a trigger to update the updated_at column on each update
CREATE TRIGGER update_media_updated_at
BEFORE UPDATE ON media
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();
