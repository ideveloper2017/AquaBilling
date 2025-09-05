-- Add is_directory column to media table
ALTER TABLE media ADD COLUMN is_directory BOOLEAN NOT NULL DEFAULT FALSE;

-- Update existing rows to set is_directory based on file_type
UPDATE media SET is_directory = TRUE WHERE file_type = 'directory';

-- Create an index for better performance when querying directories
CREATE INDEX idx_media_is_directory ON media(is_directory, file_path);
