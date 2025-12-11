-- PostgreSQL initialization script for Imagio
-- This runs automatically when the PostgreSQL container starts

-- Create extensions if needed
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create indexes for performance (will be created after Prisma migration)
-- These are prepared for when Prisma creates the tables

-- Ensure proper encoding
ALTER DATABASE imagio SET timezone TO 'UTC';

-- Create app-specific settings
COMMENT ON DATABASE imagio IS 'Imagio Learning Platform Database - Scale Ready';