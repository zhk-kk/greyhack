# .dynlib dynamic library format

- export_dynlib.gs contains the functions used by the library itself.
- load_dynlib.gs contains the functions needed to load and use the library.

Development path:
  - [x] basic loading
  - [x] about:
    - [x] name
    - [x] version
    - [x] author
    - [x] description
  - [ ] improve internal library identification
  - [ ] add async ability
  - [ ] misc methods:
    - [ ] privilege elevation/deelevation
    - [ ] unload
  - [ ] improve on ability to export functions to the library from the loading program
