# .dynlib dynamic library format

- export_dynlib.gs contains the functions used by the library itself.
- load_dynlib.gs contains the functions needed to load and use the library.

Will to add:
  - about:
    - name
    - version
  - change internal library identification
  - add async ability
  - misc methods:
    - privelege elevation/deelevation
    - unload
    - etc
  - ability to export functions to the library from the loading program
