#!/bin/bash

echo "🔧 Fixing H3 imports in all API files..."

# List of API files that need H3 imports
declare -a files=(
    "server/api/courses/index.post.ts"
    "server/api/courses/index.put.ts" 
    "server/api/courses/index.get.ts"
    "server/api/courses/[id].put.ts"
    "server/api/courses/[code].delete.ts"
    "server/api/courses/delete-by-code.delete.ts"
    "server/api/exams/index.post.ts"
    "server/api/exams/index.put.ts"
    "server/api/exams/[id].put.ts"
    "server/api/scenarios/index.post.ts"
    "server/api/scenarios/[code].delete.ts"
    "server/api/health.get.ts"
    "server/api/users/[id]/progress.get.ts"
    "server/api/utils/generate-course-code.get.ts"
)

# Check each file and add H3 imports if missing
for file in "${files[@]}"; do
    if [[ -f "$file" ]]; then
        if ! grep -q "from 'h3'" "$file"; then
            echo "Fixing imports in $file"
            # Add H3 imports after the first import line
            sed -i.bak '1a\
import { defineEventHandler, getRouterParam, readBody, createError } from '\''h3'\''
' "$file"
            rm "${file}.bak" 2>/dev/null
        fi
    fi
done

echo "✅ H3 imports fixed in all API files"