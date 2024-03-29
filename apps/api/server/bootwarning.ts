import * as log from '@colmena/logger'

log.yellow.b('┌─────────────────────────────────────────────────────────────────────────────────────────────────────┐')
log.yellow.b('│           _____                                                                                     │')
log.yellow.b('│          ╱     ╲    Colmena is currently being developed and this means that things will break.     │')
log.yellow.b('│    _____╱       ╲                                                                                   │')
log.yellow.b("│   ╱     ╲       ╱   In case of any issues first try: 'npm run clean' followed by 'npm install'.     │")
log.yellow.b("│  ╱       ╲_____╱    After changing internal dependencies run 'lerna bootstrap' to link them.        │")
log.yellow.b('│  ╲       ╱     ╲                                                                                    │')
log.yellow.b("│   ╲_____╱       ╲   After changing API endpoints run 'npm run sdk' to re-generate the Angular SDK.  │")
log.yellow.b('│         ╲       ╱                                                                                   │')
log.yellow.b('│          ╲_____╱    Join our Slack for support if issues persist: http://colmena-slack.now.sh       │')
log.yellow.b('│                                                                                                     │')
log.yellow.b('└─────────────────────────────────────────────────────────────────────────────────────────────────────┘')
log.yellow.d(`To disable this warning set 'hideBootWarning: true' in config/local.yaml `) // eslint-disable-line
