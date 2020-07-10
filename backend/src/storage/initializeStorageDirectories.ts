import { mkdirSync } from "fs";
import * as path from "path";
import {
  PrivateUserContentDir,
  ProfileBannerDir,
  ProfilePicsDir,
  PublicAssetsDir,
  PublicUserContentDir,
} from './storage.constants';
import { Logger } from '@nestjs/common';
import { doc } from 'prettier';

function helper(...nestedRelativePath: string[]): void {
  try {
    mkdirSync(path.join(".",...nestedRelativePath));
    Logger.log("Created dir: " + nestedRelativePath.join('/'), "initializeStorageDirectories");
  }
  catch (err) {
    // Ignore
    Logger.log(nestedRelativePath.join('/') + " already exists.", "initializeStorageDirectories");
  }
}

/**
 * Creates directories and subdirectories for the static hosting files that users upload
 */
export function initializeStorageDirectories(): void {
  helper(PublicUserContentDir);
  helper(PublicUserContentDir, PublicAssetsDir);
  helper(PublicUserContentDir, ProfilePicsDir);
  helper(PublicUserContentDir, ProfileBannerDir);

  helper(PrivateUserContentDir);
  Logger.log("Done setting up directories for public files", "initializeStorageDirectories");
}