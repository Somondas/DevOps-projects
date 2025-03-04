#!/bin/bash

# Check if user provided a log directory
if [ -z "$1" ]; then
    echo "Usage: $0 <log-directory>"
    exit 1
fi

LOG_DIR="$1"

# Check if the directory exists
if [ ! -d "$LOG_DIR" ]; then
    echo "Error: Directory '$LOG_DIR' does not exist."
    exit 1
fi

# Create archive directory if it doesn't exist
ARCHIVE_DIR="$HOME/Downloads/download-archives"
mkdir -p "$ARCHIVE_DIR"

# Generate timestamp for filename
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
ARCHIVE_FILE="$ARCHIVE_DIR/download_archive_$TIMESTAMP.tar.gz"

# Compress logs
tar -czf "$ARCHIVE_FILE" -C "$LOG_DIR" .

# Log the archive creation
echo "$TIMESTAMP - Archived logs from $LOG_DIR to $ARCHIVE_FILE" >> "$ARCHIVE_DIR/archive_log.txt"

# Move archive to /home/drive/Work
mv "$ARCHIVE_FILE" /home/drive/Work

# Print success message
echo "Logs archived successfully: $ARCHIVE_FILE"

