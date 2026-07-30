#!/usr/bin/env node
// bumps package.json patch version with carry at 999.
//   2.1.0   -> 2.1.1
//   2.1.999 -> 2.2.0
//   2.999.999 -> 3.0.0

const fs = require("fs");
const path = require("path");

const LIMIT = 999;
const pkgPath = path.join(__dirname, "..", "package.json");

function bump(version) {
  const m = /^(\d+)\.(\d+)\.(\d+)$/.exec(version.trim());
  if (!m) throw new Error(`version "${version}" is not a plain x.y.z semver`);

  let [major, minor, patch] = m.slice(1).map(Number);

  patch += 1;
  if (patch > LIMIT) {
    patch = 0;
    minor += 1;
    if (minor > LIMIT) {
      minor = 0;
      major += 1;
    }
  }
  return `${major}.${minor}.${patch}`;
}

if (require.main === module) {
  const raw = fs.readFileSync(pkgPath, "utf8");
  const pkg = JSON.parse(raw);
  const next = bump(pkg.version);

  if (!process.argv.includes("--dry")) {
    const updated = raw.replace(
      /("version"\s*:\s*")[^"]+(")/,
      `$1${next}$2`
    );
    if (!/"version"\s*:\s*"/.test(raw)) throw new Error("no version field found");
    fs.writeFileSync(pkgPath, updated);
  }

  process.stdout.write(next + "\n");
}

module.exports = { bump };
