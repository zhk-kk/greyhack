load_dynlib = function(dynlibFile)
	map_has_keys = function (m, keys)
		for key in keys
			if not m.hasIndex(key) then return false
		end for
		return true
	end function
	keys_are_of_type = function (m, type, keys)
		for key in keys
			if not m[key] isa type then return false
		end for
		return true
	end function
	if not dynlibFile isa File or not dynlibFile.is_binary or not dynlibFile.has_permission("x") then return false
	dlId = dynlibFile.path
	obj = get_custom_object
	if not obj.hasIndex("_dynlib") then obj._dynlib = {}
	obj._dynlib[dlId] = {"lib": {}}
	shell = get_shell
	shell.launch(dynlibFile.path, dlId)
	if not(obj.hasIndex("_dynlib") and obj._dynlib.hasIndex(dlId) and obj._dynlib[dlId] isa map) then return false
	objdl = obj._dynlib[dlId]
	if not(map_has_keys(objdl, ["lib","about","format_version"]) and keys_are_of_type(objdl, map, ["lib","about"]) and objdl.format_version isa number and map_has_keys(objdl.about, ["name","author","description","author"])) then return false
	if not(map_has_keys(objdl.about, ["name","version","description","author"]) and objdl.about.version isa number and keys_are_of_type(objdl.about, string, ["name","description","author"])) then return false
	dl = obj._dynlib[dlId].lib
	dl.dynlib = {"about": objdl.about}
	obj._dynlib.remove(dlId)
	return dl
end function

// loaded .dynlib structure:
// {
// 	dynlib = {
// 		about = {name, version, description, author}
// 	}
// 	... loaded lib's *own* structure	
// }