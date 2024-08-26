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