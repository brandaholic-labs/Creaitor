// Type definitions
export type { Database } from './database.types'

// Manual type exports for enums and common types
export type PostStatus = 'DRAFT' | 'REVIEW' | 'APPROVED' | 'SCHEDULED' | 'PUBLISHED' | 'FAILED'
export type UsabilityRating = 'GOOD_MINOR_EDITS' | 'MAJOR_REWORK' | 'NOT_USABLE'
export type UserRole = 'admin' | 'editor'
export type Platform = 'facebook' | 'instagram'
