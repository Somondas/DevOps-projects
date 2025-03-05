#!/bin/bash


# Define the paths 
# $HOME is a built-in environment variable in Linux/macOS that stores the absolute path of the current user’s home directory.
SOURCE_DIR="$HOME/Downloads"
ARCHIVE_DIR="/home/drive/Work"

# Generate arhive name with timestamp
TIMESTAMP=$(date +"%H-%M-%S-%d-%m-%Y")
ARCHIVE_FOLDER="download-archive-$TIMESTAMP"
ARCHIVE_FILE="$ARCHIVE_FOLDER.tar.gz"


# Create the archive folder
mkdir -p "$ARCHIVE_FOLDER"


# Move all files from Downloads to the new archive folder
mv "$SOURCE_DIR"/* "$ARCHIVE_FOLDER"/ 2>/dev/null

# Compress the folder
tar -czf "$ARCHIVE_FILE" "$ARCHIVE_FOLDER"


# Move the compressed file to the target archive directory
mv "$ARCHIVE_FILE" "$ARCHIVE_DIR"



# Remove the now-empty archive folder
rm -rf "$ARCHIVE_FOLDER"



# Print success message
echo "✅ Downloads archived as $ARCHIVE_FILE and moved to $ARCHIVE_DIR"
