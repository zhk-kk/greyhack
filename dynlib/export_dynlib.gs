export_dynlib = function (lib)
	if params.len < 1 then return
	dlId = params[0]
	obj = get_custom_object
	if not obj.hasIndex("_dynlib") or not obj._dynlib.hasIndex(dlId) then return
	obj._dynlib[dlId].lib = lib
end function