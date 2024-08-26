// This tools allows inspection of .dynlib files.
// WIP

load_dynlib = function(dynlibFile)
	if not dynlibFile isa File or not dynlibFile.is_binary or not dynlibFile.has_permission("x") then return false
	dlId = dynlibFile.path
	obj = get_custom_object
	if not obj.hasIndex("_dynlib") then obj._dynlib = {}
	obj._dynlib[dlId] = {"lib": {}}
	shell = get_shell
	shell.launch(dynlibFile.path, dlId)
	if not obj.hasIndex("_dynlib") or not obj._dynlib.hasIndex(dlId) or not obj._dynlib[dlId].hasIndex("lib") or not obj._dynlib[dlId].lib isa map then return false
	dl = obj._dynlib[dlId].lib
	obj._dynlib.remove(dlId)
	return dl
end function

USAGE = "USAGE: " + program_path.split("/")[:-1] + " [dynlib_path]"
if params.len != 1 then exit(USAGE)
shell = get_shell
computer = shell.host_computer
dlFile = computer.File(params[0])
if not dlFile then exit("Unable to read the provided dynlib file.")
dl = load_dynlib(dlFile)
if not dl then exit("Unable to load the provided dynlib file.")
print("Top-level functions:")
for entry in dl
	if not @entry.value isa funcRef then continue
	fname = @entry.key
	fsign = ""
	for p in str(@entry.value)[9:-1].split("(?<=[^,\)]+),")
		fsign = fsign + p
	end for
	if fsign == "" then fsign = "null"
	print(fname + " : " + fsign)
end for