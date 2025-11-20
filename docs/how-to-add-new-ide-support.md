# Új IDE támogatás hozzáadása a BMAD-hoz

Ez az útmutató bemutatja, hogyan adhatsz hozzá új IDE támogatást a BMAD v6 telepítőhöz.

## Lépések

### 1. Handler fájl létrehozása

Hozz létre egy új fájlt a BMAD repository-ban:

```
tools/cli/installers/lib/ide/your-ide-name.js
```

**Példa:** Ha egy "MyIDE" nevű IDE-t szeretnél támogatni:

```
tools/cli/installers/lib/ide/myide.js
```

### 2. BaseIDE osztály kiterjesztése

A handler fájlban importáld a BaseIDE osztályt és hozz létre egy osztályt, ami kiterjeszti:

```javascript
const path = require('node:path');
const { BaseIdeSetup } = require('./_base-ide');
const chalk = require('chalk');
const { AgentCommandGenerator } = require('./shared/agent-command-generator');

/**
 * MyIDE setup handler
 */
class MyIdeSetup extends BaseIdeSetup {
  constructor() {
    super('myide', 'MyIDE', false); // (ideCode, displayName, preferred)
    this.configDir = '.myide';      // IDE konfigurációs mappa
    this.rulesDir = 'rules';        // Opcionális: ha van rules mappa
  }

  // ... implementáció
}

module.exports = { MyIdeSetup };
```

### 3. Konstruktor paraméterek

A `super()` hívásban három paramétert kell megadni:

- **ideCode**: A telepítőben használt kód (pl. `'myide'`)
- **displayName**: Ember által olvasható név (pl. `'MyIDE'`)
- **preferred**: `true` ha preferált IDE (a telepítőben előre kiválasztva jelenik meg)

### 4. Kötelező metódusok implementálása

#### setup() metódus

Ez a fő metódus, ami létrehozza az IDE-specifikus fájlokat:

```javascript
async setup(projectDir, bmadDir, options = {}) {
  console.log(chalk.cyan(`Setting up ${this.name}...`));

  // 1. Könyvtárak létrehozása
  const ideDir = path.join(projectDir, this.configDir);
  const bmadDir = path.join(ideDir, 'bmad');
  await this.ensureDir(bmadDir);

  // 2. Agent launcher-ek generálása
  const agentGen = new AgentCommandGenerator(this.bmadFolderName);
  const { artifacts: agentArtifacts } = await agentGen.collectAgentArtifacts(
    bmadDir, 
    options.selectedModules || []
  );

  // 3. Agentek feldolgozása és írása
  let agentCount = 0;
  for (const artifact of agentArtifacts) {
    // IDE-specifikus formátumra konvertálás
    const content = this.formatForMyIde(artifact.content);
    
    const targetPath = path.join(bmadDir, `${artifact.name}.myide-format`);
    await this.writeFile(targetPath, content);
    agentCount++;
  }

  // 4. Tasks, tools, workflows feldolgozása (ha szükséges)
  const tasks = await this.getTasks(bmadDir);
  // ... hasonlóan

  console.log(chalk.green(`✓ ${this.name} configured:`));
  console.log(chalk.dim(`  - ${agentCount} agents installed`));

  return {
    success: true,
    agents: agentCount,
  };
}
```

#### cleanup() metódus (opcionális)

Ha van régi telepítés, törölheted:

```javascript
async cleanup(projectDir) {
  const fs = require('fs-extra');
  const bmadDir = path.join(projectDir, this.configDir, 'bmad');

  if (await fs.pathExists(bmadDir)) {
    await fs.remove(bmadDir);
    console.log(chalk.dim(`  Removed old BMAD configuration from ${this.name}`));
  }
}
```

#### detect() metódus (opcionális)

Ha az IDE-t automatikusan fel kell ismerni:

```javascript
async detect(projectDir) {
  // Ellenőrizd, hogy létezik-e az IDE konfigurációs mappa
  const ideConfigPath = path.join(projectDir, this.configDir);
  return await this.pathExists(ideConfigPath);
}
```

### 5. IDE-specifikus formátum

Minden IDE más formátumot használ. Nézd meg a meglévő handler-eket példának:

- **Cursor**: `.mdc` fájlok MDC frontmatter-rel
- **Claude Code**: `.md` fájlok `.claude/commands/` mappában
- **Gemini**: `.toml` fájlok `.gemini/commands/` mappában
- **Windsurf**: `.yaml` workflow fájlok

### 6. Helper metódusok

A BaseIDE osztály számos helper metódust biztosít:

- `getAgents(bmadDir)` - Agentek listája
- `getTasks(bmadDir)` - Taskok listája
- `getTools(bmadDir)` - Toolok listája
- `getWorkflows(bmadDir)` - Workflow-k listája
- `processContent(content, metadata)` - Tartalom feldolgozása (placeholder cserékkel)
- `writeFile(filePath, content)` - Fájl írása ({bmad_folder} placeholder cserével)
- `ensureDir(dirPath)` - Könyvtár létrehozása

### 7. Automatikus felismerés

A telepítő automatikusan felismeri az új handler-t! Nincs szükség regisztrációra.

A telepítő a `tools/cli/installers/lib/ide/` mappában lévő összes `.js` fájlt betölti és regisztrálja.

### 8. Tesztelés

1. **Lokális tesztelés:**
   ```bash
   cd BMAD-METHOD
   node tools/cli/bmad-cli.js install --target /path/to/test-project --ides myide
   ```

2. **Ellenőrzés:**
   - Nézd meg, hogy létrejött-e az IDE konfigurációs mappa
   - Ellenőrizd, hogy az agentek megfelelő formátumban vannak-e
   - Teszteld, hogy az IDE felismeri-e a parancsokat

## Példa: Egyszerű IDE handler

```javascript
const path = require('node:path');
const { BaseIdeSetup } = require('./_base-ide');
const chalk = require('chalk');
const { AgentCommandGenerator } = require('./shared/agent-command-generator');

/**
 * SimpleIDE setup handler
 * Ez egy egyszerű példa, ami csak agenteket telepít
 */
class SimpleIdeSetup extends BaseIdeSetup {
  constructor() {
    super('simpleide', 'SimpleIDE', false);
    this.configDir = '.simpleide';
    this.commandsDir = 'commands';
  }

  async setup(projectDir, bmadDir, options = {}) {
    console.log(chalk.cyan(`Setting up ${this.name}...`));

    // Könyvtárak létrehozása
    const ideDir = path.join(projectDir, this.configDir);
    const commandsDir = path.join(ideDir, this.commandsDir);
    await this.ensureDir(commandsDir);

    // Agent launcher-ek generálása
    const agentGen = new AgentCommandGenerator(this.bmadFolderName);
    const { artifacts: agentArtifacts } = await agentGen.collectAgentArtifacts(
      bmadDir,
      options.selectedModules || []
    );

    // Agentek írása egyszerű formátumban
    let agentCount = 0;
    for (const artifact of agentArtifacts) {
      // Egyszerű formátum: csak a launcher tartalma
      const content = artifact.content;
      
      const targetPath = path.join(
        commandsDir,
        `bmad-${artifact.module}-${artifact.name}.md`
      );
      
      await this.writeFile(targetPath, content);
      agentCount++;
      
      console.log(chalk.green(`  ✓ Added agent: ${artifact.name}`));
    }

    console.log(chalk.green(`✓ ${this.name} configured:`));
    console.log(chalk.dim(`  - ${agentCount} agents installed`));
    console.log(chalk.dim(`  - Commands directory: ${path.relative(projectDir, commandsDir)}`));

    return {
      success: true,
      agents: agentCount,
    };
  }

  async cleanup(projectDir) {
    const fs = require('fs-extra');
    const ideDir = path.join(projectDir, this.configDir);

    if (await fs.pathExists(ideDir)) {
      const bmadCommandsDir = path.join(ideDir, this.commandsDir);
      if (await fs.pathExists(bmadCommandsDir)) {
        // Csak BMAD fájlokat töröljük
        const files = await fs.readdir(bmadCommandsDir);
        for (const file of files) {
          if (file.startsWith('bmad-')) {
            await fs.remove(path.join(bmadCommandsDir, file));
          }
        }
        console.log(chalk.dim(`  Cleaned up BMAD files from ${this.name}`));
      }
    }
  }
}

module.exports = { SimpleIdeSetup };
```

## További információk

- **BaseIDE osztály dokumentáció**: `tools/cli/installers/lib/ide/_base-ide.js`
- **Példa implementációk**: 
  - `tools/cli/installers/lib/ide/cursor.js` - MDC formátum
  - `tools/cli/installers/lib/ide/claude-code.js` - Slash commands
  - `tools/cli/installers/lib/ide/gemini.js` - TOML fájlok
- **AgentCommandGenerator**: `tools/cli/installers/lib/ide/shared/agent-command-generator.js`

## Következő lépések

1. Hozd létre a handler fájlt
2. Implementáld a `setup()` metódust
3. Teszteld lokálisan
4. Ha működik, készíts Pull Request-et a BMAD repository-ba

