# How to Build the CSD Website in Google AI Studio

## Before you start
1. Download and unzip this kit.
2. Open Google AI Studio and create/open an app-building workspace that supports React code generation.
3. Upload the files you can attach in the workspace, or add the JSON and text contents to the project using its available file/editor interface.
4. Keep your original research maps and PDFs available. Do not replace them with the condensed JSON.

## Recommended upload order
1. `csd-website-data.json` — structured website content.
2. `DESIGN_GUIDELINES.md` — visual and interaction rules.
3. `01_MASTER_BUILD_PROMPT.txt` — instructs the model to build the site.
4. Original research PDFs / source files — ground claims and diagram labels.
5. Map images/PDFs later — actor map, CSD operational process, student placement journey.

If the interface does not support a folder upload, upload individual files or paste their contents into the project. The exact UI may vary; look for the app's file/asset upload or code editor area. A prompt cannot access a local folder merely because you mention its name.

## First build
1. Start with `00_STARTER_PROMPT.txt` if you want a short instruction.
2. Then send `01_MASTER_BUILD_PROMPT.txt`.
3. Ask the model to inspect the dataset and create the complete first version with clearly labelled map placeholders where the final maps are missing.
4. Preview the app. Test section navigation, actor selection, stage selection, scenario controls and checklist.
5. Save/export the code or project state using the options available in the current AI Studio workspace.

## Add maps later
1. Upload or attach the final map files.
2. Send `02_MAPS_LATER_PROMPT.txt`.
3. Ask the model to update only the diagram data/components and preserve the rest of the design.
4. Check every stage label, sequence and relationship against the source images. Correct anything ambiguous instead of letting the model guess.

## Final QA
Send `04_CONTENT_AUDIT_PROMPT.txt`, then `03_REFINEMENT_PROMPT.txt` if needed. Check the website at desktop and mobile widths and verify keyboard accessibility and reduced-motion behaviour.

## Important
- Exact Google AI Studio controls can change. If you cannot find a file-upload option, use the workspace's code editor or paste file contents.
- Keep an independent copy of all source files and generated code.
- Do not treat the JSON as official policy. It is a structured starter dataset based on the available project summary.
- The actor map's relationship list is intentionally empty until actual map connections are supplied and verified.
