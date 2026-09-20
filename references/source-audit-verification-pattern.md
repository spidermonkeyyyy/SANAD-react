# Source Audit Verification Pattern

## File Count Verification
- Run: `find <path> -name "*.dart" | wc -l` (or `find <path> -name "*.ts"` for RN)
- Never use approximate numbers from prior sessions or summaries
- Correct prior approximations immediately (e.g., "19" → "24" for Education, "19" → "24" for Treatment)
- Record exact count in PHASE_2C_PREFLIGHT_AUDIT.md and PHASE_2C_COMPLETION_REPORT.md

## Mechanism Verification
- Read the source provider/notifier/mechanism file (e.g., `treatment_provider.dart`)
- Identify the actual mechanism: `StateNotifier`, `ChangeNotifier`, `Riverpod provider`
- Map behavior, do not mechanically translate the mechanism
- Preserve derived state semantics (e.g., `weeklyProgress = completed / target`)

## Subclass Separation
- A class declared inside the same Dart file as another class is NOT automatically part of that class's public surface
- Read each class declaration independently
- Key example: `InternalNote` inside `message.dart` — architecturally separated ("must never be shown to patient by accident", line 8-9)
- Class declarations and any separation comments are binding rules; migrations must preserve them

## Union Parity
- Source enum values + actual mock usages must determine the target type union
- Source enum is 4 values but mock data uses a 5th — extend the union to match usage
- Do not silently drop members; verify by inspecting mock data field presence
- Example: `SmokingEntry trigger` — Flutter had `'habit' | 'stress' | 'social' | 'emotion'`, RN added `'other'` for parity with mock data usage

## Workdir Persistence (Windows)
- On Windows the `terminal` tool does NOT preserve CWD across calls
- Use the `workdir` parameter on every command that references project files
- Or chain commands in a single `terminal(command)` call
- A naked `cd` at the start of a follow-up call lands back in the user home and every subsequent relative-path command fails silently
- Always pass `workdir='C:\\Users\\User\\Desktop\\sure\\sanad-rn'` (or the actual RN project path)

## Source-Comment Binding Rules
- Read the file-header comments of every audited model and provider
- Source comments at the top of files encode binding rules that the migration must preserve
- Example from message.dart (line 8-9): `"must never be shown to patient by accident"` — the RN type must NOT expose `internalNotes` to patient
- These are not optional documentation; they are binding architectural rules
- Do not delete or modify source comments; they govern the migration contract

## Behavioral Comparison Pattern
```text
| Workflow | Flutter | RN | Result |
|---|---|---|---|
| Initial state | ... | ... | MATCH/DIFFERENCE |
| Loading | ... | ... | MATCH/DIFFERENCE |
| Data | ... | ... | MATCH/DIFFERENCE |
| Progress | ... | ... | MATCH/DIFFERENCE |
| Completion | ... | ... | MATCH/DIFFERENCE |
| Errors | ... | ... | MATCH/DIFFERENCE |
| Navigation | ... | ... | MATCH/DIFFERENCE |
```
- If a workflow is not source-backed: `NOT SOURCE-BACKED`
- Do not call it MATCH
```