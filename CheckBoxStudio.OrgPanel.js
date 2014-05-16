
Object.defineProperty(this, "CheckBoxStudio", { value: {} });

Object.defineProperties(CheckBoxStudio, {

	Point: { value: function () {} },
	Padding: { value: function () {} },
	Corners: { value: function () {} },
	OrgNodeStyle: { value: function () {} },
	OrgNode: { value: function () {} },
	OrgPanel: { value: function () {} },

	nodeStyles: { value: {} },

	addNodeStyle: { value: function (style) {

		if (style instanceof CheckBoxStudio.OrgNodeStyle)
			CheckBoxStudio.nodeStyles[style.element.id] = style;

	}},

	removeNodeStyle: { value: function (style) {

		if (style instanceof CheckBoxStudio.OrgNodeStyle)
			CheckBoxStudio.nodeStyles[style.element.id] = undefined;

	}}

});

Object.defineProperties(CheckBoxStudio.Point, {

	create: { value: function (x, y) {

		x = parseInt(x);
		y = parseInt(y);

		if (isNaN(x))
			x = 0;

		if (isNaN(y))
			y = x;

		var point = new CheckBoxStudio.Point();

		point._x = x;
		point._y = y;	

		return point;

	}}

});

Object.defineProperties(CheckBoxStudio.Point.prototype, {

	x: { get: function () {

		return this._x;

	}},

	y: { get: function () {

		return this._y;

	}},

	toString: { value: function () {

		return this.x + ", " + this.y;

	}}

});

Object.defineProperties(CheckBoxStudio.Padding, {

	create: { value: function (left, top, right, bottom) {

		left = parseInt(left);
		top = parseInt(top);
		right = parseInt(right);
		bottom = parseInt(bottom);

		if (isNaN(left))
			left = 0;
		else if (left < 0)
			left = 0;

		if (isNaN(top))
			top = left;
		else if (top < 0)
			top = 0;

		if (isNaN(right))
			right = left;
		else if (right < 0)
			right = 0;

		if (isNaN(bottom))
			bottom = top;
		else if (bottom < 0)
			bottom = 0;

		var padding = new CheckBoxStudio.Padding();

		padding._left = left;
		padding._top = top;
		padding._right = right;
		padding._bottom = bottom;

		return padding;

	}}

});

Object.defineProperties(CheckBoxStudio.Padding.prototype, {

	left: { get: function () {

		return this._left;

	}},

	top: { get: function () {

		return this._top;

	}},

	right: { get: function () {

		return this._right;

	}},

	bottom: { get: function () {

		return this._bottom;

	}},

	toString: { value: function () {

		return this.left + ", " + this.top + ", " + this.right + ", " + this.bottom;

	}}

});

Object.defineProperties(CheckBoxStudio.Corners, {

	create: { value: function (topLeft, topRight, bottomRight, bottomLeft) {

		var values = ["squared", "beveled", "rounded"];

		if (typeof topLeft != "string")
			topLeft = "rounded";
		else
			topLeft = topLeft.trim().toLowerCase();

		if (values.indexOf(topLeft) < 0)
			topLeft = "rounded";

		if (typeof topRight != "string")
			topRight = topLeft;
		else
			topRight = topRight.trim().toLowerCase();

		if (values.indexOf(topRight) < 0)
			topRight = "rounded";

		if (typeof bottomRight != "string")
			bottomRight = topLeft;
		else
			bottomRight = bottomRight.trim().toLowerCase();

		if (values.indexOf(bottomRight) < 0)
			bottomRight = "rounded";

		if (typeof bottomLeft != "string")
			bottomLeft = topRight;
		else
			bottomLeft = bottomLeft.trim().toLowerCase();

		if (values.indexOf(bottomLeft) < 0)
			bottomLeft = "rounded";

		var corners = new CheckBoxStudio.Corners();
			
		corners._topLeft = topLeft;
		corners._topRight = topRight;
		corners._bottomRight = bottomRight;
		corners._bottomLeft = bottomLeft;	

		return corners;

	}}

});

Object.defineProperties(CheckBoxStudio.Corners.prototype, {

	topLeft: { get: function () {

		return this._topLeft;

	}},

	topRight: { get: function () {

		return this._topRight;

	}},

	bottomRight: { get: function () {

		return this._bottomRight;

	}},

	bottomLeft: { get: function () {

		return this._bottomLeft;

	}},

	toString: { value: function () {

		return this.topLeft + ", " + this.topRight + ", " + this.bottomRight + ", " + this.bottomLeft;

	}}

});

Object.defineProperties(CheckBoxStudio.OrgNodeStyle, {

	create: { value: function (id) {

		var element = document.createElement("style");

		element.id = id;
		element.setAttribute("cb:orgnodestyle", null);

		CheckBoxStudio.OrgNodeStyle.extend(element);

		return element.orgNodeStyle;

	}},

	extend: { value: function (element) {

		var style = new CheckBoxStudio.OrgNodeStyle();

		style._element = element;
		element._orgNodeStyle = style;

		if (element.orgNodeStyle)
			return;

		Object.defineProperty(element, "orgNodeStyle", {

			get: function () { return this._orgNodeStyle; }

		});

	}}

});

Object.defineProperties(CheckBoxStudio.OrgNodeStyle.prototype, {

	element: { get: function () {

		return this._element;

	}},

	margin: { get: function () {

		var value = this.element.getAttribute("cb:margin");

		if (!value)
			return CheckBoxStudio.Padding.create(7);

		var values = value.match(/\d{1,2}/g);

		if (!values)
			return CheckBoxStudio.Padding.create(7);

		return CheckBoxStudio.Padding.create.apply(null, values);

	}, set: function (value) {

		if (!(value instanceof CheckBoxStudio.Padding))
			return;

		this.element.setAttribute("cb:margin", value);

	}},

	corners: { get: function () {

		var value = this.element.getAttribute("cb:corners");

		if (!value)
			return CheckBoxStudio.Corners.create("rounded");

		var values = value.match(/rounded|beveled|squared/gi);

		if (!values)
			return CheckBoxStudio.Corners.create("rounded");

		return CheckBoxStudio.Corners.create.apply(null, values);

	}, set: function (value) {

		if (!(value instanceof CheckBoxStudio.Corners))
			return;

		this.element.setAttribute("cb:corners", value);

	}},

	linkMode: { get: function () {

		var value = this.element.getAttribute("cb:linkmode");

		if (!value)
			return "foreground";

		value = value.trim().toLowerCase();

		switch (value) {

			case "background": return value;
			case "none": return value;
			default: return "foreground";

		}

	}, set: function (value) {

		this.element.setAttribute("cb:linkmode", value);

	}},

	gradientMode: { get: function () {

		var value = this.element.getAttribute("cb:gradientmode");

		if (!value)
			return "vertical";

		value = value.trim().toLowerCase();

		switch (value) {

			case "horizontal": return value;
			case "forwarddiagonal": return value;
			case "backwarddiagonal": return value;
			default: return "vertical";

		}

	}, set: function (value) {

		this.element.setAttribute("cb:gradientmode", value);

	}},

	startColor: { get: function () {

		var value = this.element.getAttribute("cb:startcolor");

		if (!value)
			return "white";

		return value;

	}, set: function (value) {

		this.element.setAttribute("cb:startcolor", value);

	}},

	endColor: { get: function () {

		var value = this.element.getAttribute("cb:endcolor");

		if (!value)
			return "lightgray";

		return value;

	}, set: function (value) {

		this.element.setAttribute("cb:endcolor", value);

	}},

	borderColor: { get: function () {

		var value = this.element.getAttribute("cb:bordercolor");

		if (!value)
			return "darkgray";

		return value;

	}, set: function (value) {

		this.element.setAttribute("cb:bordercolor", value);

	}},

	shadowVisible: { get: function () {

		var value = this.element.getAttribute("cb:shadowvisible");

		if (!value)
			return true;

		return value.trim().toLowerCase() != "false";

	}, set: function (value) {

		this.element.setAttribute("cb:shadowvisible", value);

	}},

	toString: { value: function () {

		return "[object CheckBoxStudio.OrgNodeStyle]";

	}}

});

Object.defineProperties(CheckBoxStudio.OrgNode, {

	create: { value: function (element, styleId) {

		if (!(element instanceof HTMLElement)) {

			var elem = document.createElement("div");
			elem.innerHTML = element;

			var nodes = elem.childNodes;

			if (nodes.length == 1)
				if (nodes[0].nodeType == 1)
					elem = nodes[0];

			element = elem;

		}

		CheckBoxStudio.OrgNode.extend(element, styleId);

		return element.orgNode;	

	}},

	extend: { value: function (element, styleId) {

		if (!(element instanceof HTMLElement))
			return;

		var node = new CheckBoxStudio.OrgNode();

		node._element = element;
		element._orgNode = node;

		node._panel = null;
		node._parent = null;
		node._nodes = [];
		node._frameRect = null;

		if (styleId)
			node.styleId = styleId;

		if (element.orgNode)
			return;

		Object.defineProperty(element, "orgNode", {

			get: function () { return this._orgNode; }

		});

	}}

});

Object.defineProperties(CheckBoxStudio.OrgNode.prototype, {

	element: { get: function () {

		return this._element;

	}},

	root: { get: function () {

		if (!this._parent)
			return this;

		return this._parent.root;

	}},

	panel: { get: function () {

		return this.root._panel;

	}},

	parent: { get: function () {

		var panel = this.panel;
		var parent = this._parent;

		if (panel)
			if (parent == panel._root) // do not return virtual root in panel
				return null;

		return parent;

	}},

	nodes: { get: function () {

		return this._nodes;

	}},

	prevSibling: { get: function () {

		var parent = this._parent;

		if (!parent)
			return null;

		var index = this.index;

		if (index == 0)
			return null;

		return parent._nodes[index - 1];

	}},

	nextSibling: { get: function () {

		var parent = this._parent;

		if (!parent)
			return null;

		var nodes = parent._nodes;
		var index = this.index;

		if (index == nodes.length - 1)
			return null;

		return nodes[index + 1];

	}},

	firstChild: { get: function () {

		var nodes = this._nodes;

		if (nodes.length == 0)
			return null;

		return nodes[0];

	}},

	lastChild: { get: function () {

		var nodes = this._nodes;

		if (nodes.length == 0)
			return null;

		return nodes[nodes.length - 1];

	}},

	level: { get: function () {

		var parent = this._parent;

		if (!parent)
			return 0;

		return 1 + parent.level;

	}},

	index: { get: function () {

		var parent = this._parent;

		if (!parent)
			return 0;

		return parent._nodes.indexOf(this);

	}},

	isCollapsed: { get: function () {

		var parent = this._parent;

		if (!parent)
			return false;

		if (!parent.expanded)
			return true;

		return parent.isCollapsed;

	}},

	style: { get: function () {

		var style = CheckBoxStudio.nodeStyles[this.styleId];

		if (!style)
			return CheckBoxStudio.OrgNodeStyle._default;

		return style;

	}},

	styleId: { get: function () {

		var value = this.element.getAttribute("cb:styleid");

		if (!value)
			return "";

		return value.trim();

	}, set: function (value) {

		if (value)
			this.element.setAttribute("cb:styleid", value);
		else
			this.element.removeAttribute("cb:styleid");

		var panel = this.panel;

		if (panel)
			panel.performLayout();

	}},

	expanded: { get: function () {

		var value = this.element.getAttribute("cb:expanded");

		if (!value)
			return true;

		if (this._panel)
			return true;

		return value.trim().toLowerCase() != "false";

	}, set: function (value) {

		if (value == false)
			this.collapse();
		else
			this.expand();

	}},

	insertNode: { value: function (node, index) {

		// TODO: validate node...

		var nodes = this._nodes;

		if (!(node instanceof CheckBoxStudio.OrgNode))
			node = CheckBoxStudio.OrgNode.create(node);

		if (typeof index != "number")
			index = nodes.length;

		node._parent = this;
		//node.element.setAttribute("cb:parentid", this.element.id);
		nodes.splice(index, 0, node);

		var panel = this.panel;

		if (!panel)
			return;

		panel.addElements(node);
		panel.performLayout();

	}},

	insertNodeArray: { value: function (nodes, index) {

		if (!(nodes instanceof Array))
			return;

		if (typeof index != "number")
			index = this._nodes.length;

		var panel = this.panel;

		if (panel)
			panel.suspendLayout();

		for (var i = nodes.length - 1; i >= 0; i--)
			this.insertNode(nodes[i], index);

		if (panel)
			panel.resumeLayout(true);

	}},

	removeNode: { value: function (node) {

		// TODO: validate node...

		var nodes = this._nodes;

		if (typeof node == "number")
			node = nodes[node];

		if (!(node instanceof CheckBoxStudio.OrgNode))
			return;

		var panel = this.panel;

		if (panel)
			panel.removeElements(node); // call before actual removal

		node._parent = null;
		//node.element.removeAttribute("cb:parentid");
		nodes.splice(nodes.indexOf(node), 1);

		if (panel)
			panel.performLayout();

	}},

	clearNodes: { value: function () {

		var nodes = this._nodes;
		var panel = this.panel;

		if (panel)
			panel.suspendLayout();

		for (var i = nodes.length - 1; i >= 0; i--)
			this.removeNode(nodes[i]);

		if (panel)
			panel.resumeLayout(true);

	}},

	expand: { value: function (allSubNodes) {

		if (typeof allSubNodes != "boolean")
			allSubNodes = false;

		if (this.expanded && !allSubNodes)
			return;

		var panel = this.panel;

		if (panel)
			panel.suspendLayout();

		this.element.removeAttribute("cb:expanded");

		var nodes = this._nodes;

		if (allSubNodes)
			for (var i = 0; i < nodes.length; i++)
				nodes[i].expand(true);

		if (panel)
			panel.resumeLayout(true);

	}},

	collapse: { value: function (allSubNodes) {

		if (typeof allSubNodes != "boolean")
			allSubNodes = false;

		if (!this.expanded && !allSubNodes)
			return;

		var panel = this.panel;

		if (panel)
			panel.suspendLayout();

		this.element.setAttribute("cb:expanded", "false");

		var nodes = this._nodes;

		if (allSubNodes)
			for (var i = 0; i < nodes.length; i++)
				nodes[i].collapse(true);

		if (panel)
			panel.resumeLayout(true);

	}},

	toggle: { value: function () {

		this.expanded = !this.expanded;

	}},

	find: { value: function (element) {

		if (this._element == element)
			return this;

		var node = null;
		var nodes = this._nodes;
		var length = nodes.length;

		for (var i = 0; i < length; i++)
			if ((node = nodes[i].find(element)) != null)
				return node;

		return null;

	}},

	getAllNodes: { value: function (includeCurrent, includeCollapsed) {

		if (typeof includeCurrent != "boolean")
			includeCurrent = true;

		if (typeof includeCollapsed != "boolean")
			includeCollapsed = true;		

		var allNodes = [];
		var nodes = this._nodes;
		var length = nodes.length;

		if (includeCurrent)
			allNodes.push(this);

		if (!includeCollapsed)
			if (!this.expanded)
				return allNodes;

		for (var i = 0; i < length; i++)
			allNodes = allNodes.concat(nodes[i].getAllNodes(true, includeCollapsed));

		return allNodes;

	}},

	ascendNodes: { value: function () {

		if (!this._parent)
			return;

		var panel = this.panel;

		if (panel)
			panel.suspendLayout();

		var node = null;

		while (node = this.lastChild) {

			this.removeNode(node);
			this._parent.insertNode(node, this.index + 1);

		}

		if (panel)
			panel.resumeLayout(true);

	}},

	remove: { value: function (ascendNodes) {

		if (!this._parent)
			return;

		if (typeof ascendNodes != "boolean")
			ascendNodes = false;

		var panel = this.panel;

		if (panel)
			panel.suspendLayout();

		if (ascendNodes)
			this.ascendNodes();

		this._parent.removeNode(this);

		if (panel)
			panel.resumeLayout(true);

	}},

	toString: { value: function () {

		return "[object CheckBoxStudio.OrgNode]";

	}}

});

Object.defineProperties(CheckBoxStudio.OrgPanel, {

	create: { value: function (id) {

		var element = document.createElement("div");

		element.id = id;
		element.setAttribute("cb:orgpanel", null);

		CheckBoxStudio.OrgPanel.extend(element);

		return element.orgPanel;

	}},

	extend: { value: function (element) {

		var panel = new CheckBoxStudio.OrgPanel();
		var root = CheckBoxStudio.OrgNode.create(element);

		root._panel = panel;
		root.element._orgNode = null;

		panel._root = root;
		panel._targetNode = null;
		panel._tabIndex = 0;
		panel._orgSize = {width: 0, height: 0};
		panel._suspendCount = 0;
		panel._initializing = false;

		panel._canvas = document.createElement("canvas");
		panel._canvas.setAttribute("style", "display: block; position: absolute;");

		panel._container = document.createElement("div");

		panel._targetLeft = document.createElement("img");
		panel._targetLeft.setAttribute("style", "display: none; position: absolute;");
		panel._targetLeft.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAJCAYAAADgkQYQAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAadEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjEwMPRyoQAAADxJREFUKFN9jwEKACAIA316P182WVQsBwfiDcHIIBkcAAvdgS1zZ7jKnBtYXnHyxS5Fe2lLpZXKV9Z3iAltQVaujxruTQAAAABJRU5ErkJggg==";

		panel._targetRight = document.createElement("img");
		panel._targetRight.setAttribute("style", "display: none; position: absolute;");
		panel._targetRight.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAJCAYAAADgkQYQAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAadEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjEwMPRyoQAAAD9JREFUKFNj+P//PxjjAA1ATFAShlEAuiSKIlySYMwIZeAFTEAMUtgI5uECaL7Dbi1MEV7F6IpgGAqAihn+AwCNNUfCCakBBwAAAABJRU5ErkJggg==";

		panel._host = document.createElement("div");
		panel._host.setAttribute("style", "position: relative");
		panel._host.appendChild(panel._canvas);
		panel._host.appendChild(panel._container);
		panel._host.appendChild(panel._targetLeft);
		panel._host.appendChild(panel._targetRight);

		var html = panel.element.innerHTML;

		panel.element.innerHTML = "";
		panel.element.appendChild(panel._host);

		if (!panel.element.addEventListener)
			return;

		var func = function (e) { panel.initializeNode(e.target); };

		panel.element.addEventListener("DOMNodeInserted", func, false);

		panel.suspendLayout();
		panel._container.innerHTML = html; // set existing HTML and let "initializeNode" do the work
		panel.resumeLayout(true);

		panel.element.removeEventListener("DOMNodeInserted", func, false);

		element._orgPanel = panel;

		if (element.orgPanel)
			return;

		Object.defineProperty(element, "orgPanel", {

			get: function () { return this._orgPanel; }

		});

	}}

});

Object.defineProperties(CheckBoxStudio.OrgPanel.prototype, {

	element: { get: function () {

		return this._root.element;

	}},

	nodes: { get: function () {

		return this._root.nodes;

	}},

	targetNode: { get: function () {

		return this._targetNode;

	}, set: function (value) {

		this._targetNode = value;

		this._targetLeft.style.display = "none";
		this._targetRight.style.display = "none";

		if (!value)
			return;

		var rect = value._frameRect;
		var style = null;

		style = this._targetLeft.style;
		style.display = "block";
		style.left = (rect.left - 4) + "px";
		style.top = (rect.top + rect.height / 2 - 5) + "px";

		style = this._targetRight.style;
		style.display = "block";
		style.left = (rect.right - 5) + "px";
		style.top = (rect.top + rect.height / 2 - 5) + "px";

	}},

	autoSize: { get: function () {

		var value = this.element.getAttribute("cb:autosize");

		if (!value)
			return true;

		return value.trim().toLowerCase() != "false";

	}, set: function (value) {

		this.element.setAttribute("cb:autosize", value);
		this.performLayout();

	}},

	padding: { get: function () {

		var value = this.element.getAttribute("cb:padding");

		if (!value)
			return 11;

		value = parseInt(value);

		if (value < 5)
			return 5;

		return value;

	}, set: function (value) {

		this.element.setAttribute("cb:padding", value);
		this.performLayout();

	}},

	orientation: { get: function () {

		var value = this.element.getAttribute("cb:orientation");

		if (!value)
			return "horizontal";

		value = value.trim().toLowerCase();

		switch (value) {

			case "vertical": return value;
			default: return "horizontal";

		}

	}, set: function (value) {

		this.element.setAttribute("cb:orientation", value);
		this.performLayout();

		this.element.scrollLeft = 0;
		this.element.scrollTop = 0;

	}},

	parentSpacing: { get: function () {

		var value = this.element.getAttribute("cb:parentspacing");

		if (!value)
			return 19;

		value = parseInt(value);

		if (value < 5)
			return 5;

		return value;

	}, set: function (value) {

		this.element.setAttribute("cb:parentspacing", value);
		this.performLayout();

	}},

	siblingSpacing: { get: function () {

		var value = this.element.getAttribute("cb:siblingspacing");

		if (!value)
			return 9;

		value = parseInt(value);

		if (value < 3)
			return 3;

		return value;

	}, set: function (value) {

		this.element.setAttribute("cb:siblingspacing", value);
		this.performLayout();

	}},	

	showRootLines: { get: function () {

		var value = this.element.getAttribute("cb:showrootlines");

		if (!value)
			return true;

		return value.trim().toLowerCase() != "false";

	}, set: function (value) {

		this.element.setAttribute("cb:showrootlines", value);
		this.performLayout();

	}},

	showSubArrows: { get: function () {

		var value = this.element.getAttribute("cb:showsubarrows");

		if (!value)
			return true;

		return value.trim().toLowerCase() != "false";

	}, set: function (value) {

		this.element.setAttribute("cb:showsubarrows", value);
		this.performLayout();

	}},

	drawThickLines: { get: function () {

		var value = this.element.getAttribute("cb:drawthicklines");

		if (!value)
			return false;

		return value.trim().toLowerCase() == "true";

	}, set: function (value) {

		this.element.setAttribute("cb:drawthicklines", value);
		this.refresh();

	}},	
	
	linkLineStyle: { get: function () {

		var value = this.element.getAttribute("cb:linklinestyle");

		if (!value)
			return "default";

		value = value.trim().toLowerCase();

		switch (value) {

			case "direct": return value;
			default: return "default";

		}

	}, set: function (value) {

		this.element.setAttribute("cb:linklinestyle", value);
		this.refresh();

	}},

	backLinkColor: { get: function () {

		var value = this.element.getAttribute("cb:backlinkcolor");

		if (!value)
			return "lightgray";

		return value;

	}, set: function (value) {

		this.element.setAttribute("cb:backlinkcolor", value);
		this.refresh();

	}},

	foreLinkColor: { get: function () {

		var value = this.element.getAttribute("cb:forelinkcolor");

		if (!value)
			return "black";

		return value;

	}, set: function (value) {

		this.element.setAttribute("cb:forelinkcolor", value);
		this.refresh();

	}},

	shadowColor: { get: function () {

		var value = this.element.getAttribute("cb:shadowcolor");

		if (!value)
			return "darkgray";

		return value;

	}, set: function (value) {

		this.element.setAttribute("cb:shadowcolor", value);
		this.refresh();

	}},

	shadowOffset: { get: function () {

		var value = this.element.getAttribute("cb:shadowoffset");

		if (!value)
			return CheckBoxStudio.Point.create(3);

		var values = value.match(/-?\d/g);

		if (!values)
			return CheckBoxStudio.Point.create(3);

		return CheckBoxStudio.Point.create.apply(null, values);

	}, set: function (value) {

		if (!(value instanceof CheckBoxStudio.Point))
			return;

		this.element.setAttribute("cb:shadowoffset", value);
		this.refresh();

	}},

	shadowBlur: { get: function () {

		var value = this.element.getAttribute("cb:shadowblur");

		if (!value)
			return 3;

		value = parseInt(value);

		if (value < 0)
			return 0;

		if (value > 9)
			return 9;

		return value;

	}, set: function (value) {

		this.element.setAttribute("cb:shadowblur", value);
		this.refresh();

	}},

	onElementAdded: { value: function (element) {

		eval(this.element.getAttribute("cb:onelementadded"));

	}},

	onElementRemoved: { value: function (element) {

		eval(this.element.getAttribute("cb:onelementremoved"));

	}},

	initializeNode: { value: function (element) {

		if (element.nodeType != 1)
			return;

		var parent = this._root;
		var target = null;
		var targetId = element.getAttribute("cb:parentid");

		if (targetId)
			target = document.getElementById(targetId);

		if (target)
			if (target.parentNode == this._container)
				parent = this.find(target);

		var node = CheckBoxStudio.OrgNode.create(element);

		this._initializing = true;
		parent.insertNode(node);
		this._initializing = false;

		if (typeof this.onElementAdded == "function")
			this.onElementAdded(element);

	}},

	addElements: { value: function (node) {

		if (this._initializing)
			return;

		var nodes = node.nodes;

		this._container.appendChild(node.element);

		if (typeof this.onElementAdded == "function")
			this.onElementAdded(node.element);

		for (var i = 0; i < nodes.length; i++)
			this.addElements(nodes[i]);

	}},

	removeElements: { value: function (node) {

		if (this._initializing)
			return;

		var nodes = node.nodes;

		this._container.removeChild(node.element);

		if (typeof this.onElementRemoved == "function")
			this.onElementRemoved(node.element);	

		for (var i = 0; i < nodes.length; i++)
			this.removeElements(nodes[i]);

	}},

	insertNode: { value: function (node, index) {

		this._root.insertNode(node, index);

	}},

	insertNodeArray: { value: function (nodes, index) {

		this._root.insertNodeArray(nodes, index);

	}},	

	removeNode: { value: function (node) {

		this._root.removeNode(node);

	}},

	clearNodes: { value: function () {

		this._root.clearNodes();

	}},	

	find: { value: function (element) {

		return this._root.find(element);

	}},

	getLocalPoint: { value: function (x, y) {

		var localX = 0;
		var localY = 0;
		var elem = this.element;

		while (elem.offsetParent) {

			localX += elem.offsetLeft - elem.scrollLeft;
			localY += elem.offsetTop - elem.scrollTop;

			elem = elem.offsetParent;

		}

		return CheckBoxStudio.Point.create(x - localX, y - localY);

	}},

	getDistance: { value: function (node, x, y) {

		var rect = node._frameRect;

		if (x < rect.left)
			x = rect.left - x;
		else if (x > rect.right)
			x = x - rect.right;
		else
			x = 0;

		if (y < rect.top)
			y = rect.top - y;
		else if (y > rect.bottom)
			y = y - rect.bottom;
		else
			y = 0;

		return Math.sqrt(x * x + y * y);

	}},

	getNearestNode: { value: function (x, y, nodesToIgnore, maxDistance) {

		if (typeof maxDistance != "number")
			maxDistance = 300;

		var nearest = null;
		var nodes = this._root.getAllNodes(false, false);
		var length = nodes.length;
		var ignore = [].concat(nodesToIgnore);

		for (var i = 0; i < length; i++) {

			var node = nodes[i];

			if (ignore.indexOf(node) >= 0)
				continue; 

			var distance = this.getDistance(node, x, y);

			if (distance > maxDistance)
				continue;

			nearest = node;
			maxDistance = distance;

		}

		return nearest;

	}},

	getTargetNode: { value: function (x, y, nodesToIgnore, maxDistance) {

		var nodes = this._root.getAllNodes(false, false);
		var length = nodes.length;
		var orientation = this.orientation;
		var ignore = [].concat(nodesToIgnore);

		for (var i = 0; i < length; i++) {

			var node = nodes[i];

			if (orientation == "vertical") {

				if (x < node._frameRect.left)
					ignore.push(node);

			} else {

				if (y < node._frameRect.top)
					ignore.push(node);

			}

		}

		var target = this.getNearestNode(x, y, ignore, maxDistance);

		if (!target)
			return null;

		if (orientation == "vertical") {

			if (target._frameRect.right < x)
				return target;

		} else {

			if (target._frameRect.bottom < y)
				return target;

		}

		while (target = target.parent)
			if (ignore.indexOf(target) < 0)
				break;

		return target;

	}},

	getTargetIndex: { value: function (parent, x, y, nodesToIgnore) {

		var index = 0;
		var nodes = this._root.nodes;
		var orientation = this.orientation;
		var ignore = [].concat(nodesToIgnore);

		if (parent instanceof CheckBoxStudio.OrgNode) {

			nodes = parent.nodes;

			if (!parent.expanded)
				return nodes.length;

		}

		for (var i = 0; i < nodes.length; i++) {

			var node = nodes[i];

			if (ignore.indexOf(node) >= 0)
				continue;

			var rect = node._frameRect;

			if (orientation == "vertical") {

				if (y <= rect.top + rect.height / 2)
					break;

			} else {

				if (x <= rect.left + rect.width / 2)
					break;

			}

			index++;

		}

		return index;

	}},

	suspendLayout: { value: function () {

		this._suspendCount++;

	}},

	resumeLayout: { value: function (perform) {

		if (this._suspendCount <= 0)
			return;

		this._suspendCount--;

		if (perform)
			this.performLayout();

	}},

	performLayout: { value: function () {

		if (this._suspendCount > 0)
			return;

		var scrollLeft = this.element.scrollLeft;
		var scrollTop = this.element.scrollTop;
		var initSpacing = this.padding + (this.showRootLines ? this.parentSpacing : 0);

		this._canvas.width = 0;
		this._canvas.height = 0;

		this._tabIndex = 0;
		this.initializeLayout(this._root);

		this._orgSize = {width: 0, height: 0};

		if (this.orientation == "vertical")
			this.layOutVertically(this._root, initSpacing, 0);
		else
			this.layOutHorizontally(this._root, 0, initSpacing);

		this.refresh();

		this.element.scrollLeft = scrollLeft;
		this.element.scrollTop = scrollTop;

		if (!this.autoSize)
			return;

		this.element.style.width = (this._orgSize.width + this.padding) + "px";
		this.element.style.height = (this._orgSize.height + this.padding) + "px";

		var node = this.element.orgNode;

		if (!node)
			return;

		var panel = node.panel;

		if (panel)
			panel.performLayout();

	}},

	refresh: { value: function () {

		if (this._suspendCount > 0)
			return;

		var size = this._orgSize;

		this._canvas.width = size.width + this.padding;
		this._canvas.height = size.height + this.padding;

		var context = this._canvas.getContext("2d");

		var width = this._canvas.width;
		var height = this._canvas.height;

		if (width > 50 && height > 50) {

			var size = (width < height ? width : height) / 2;

			if (size > 200)
				size = 200;

			context.beginPath();
			context.moveTo(0, 0);
			context.lineTo(0, size);
			context.lineTo(size, 0);
			context.closePath();

			context.fillStyle = "rgba(224, 224, 224, 0.5)";
			context.fill();

			context.rotate(-Math.PI / 4);
			context.scale(size / 330, size / 330);

			context.font = "bold 48px Verdana";
			context.textAlign = "center";
			context.fillStyle = "lightgray";
			context.fillText("HTML5", 0, 140);
			context.fillText("OrgPanel", 0, 200);
			context.fillText("CheckBox Studio", 0, 290);

			context.rotate(Math.PI / 4);	
			context.scale(330 / size, 330 / size);

		}

		context.lineWidth = 0;
		context.fillStyle = "white";

		context.shadowColor = this.shadowColor;
		context.shadowOffsetX = this.shadowOffset.x;
		context.shadowOffsetY = this.shadowOffset.y;
		context.shadowBlur = this.shadowBlur;

		this.renderShadows(context, this._root);

		context.shadowColor = "transparent";
		context.shadowOffsetX = 0;
		context.shadowOffsetY = 0;
		context.shadowBlur = 0;

		context.lineWidth = this.drawThickLines ? 3 : 1;

		this.renderRootLines(context, "background");
		context.strokeStyle = this.backLinkColor;
		this.renderLinks(context, this._root, "background");

		this.renderRootLines(context, "foreground");
		context.strokeStyle = this.foreLinkColor;
		this.renderLinks(context, this._root, "foreground");	

		this.renderFrames(context, this._root);

	}},

	initializeLayout: { value: function (node) {	

		if (node != this._root) {

			var elem = node.element;
			var style = elem.style;

			elem.tabIndex = ++this._tabIndex;

			style.display = node.isCollapsed ? "none" : "inline-block";
			style.position = "absolute";
			style.left = "0px";
			style.top = "0px";
			style.right = "auto";
			style.bottom = "auto";
			style.margin = "0px";
			style.whiteSpace = "nowrap";

		}

		var nodes = node.nodes;

		for (var i = 0; i < nodes.length; i++)
			this.initializeLayout(nodes[i]);

	}},

	layOutHorizontally: { value: function (node, left, top) {

		var spanDiff = this.getSpanDiff(node);
		var setLeft = left;
		var nextTop = top;
		var nodes = node.nodes;

		if (node == this._root && spanDiff <= this.padding * 2)
			left += this.padding;
		else if (spanDiff > 0)
			left += Math.round(spanDiff / 2);

		if (node != this._root)
			nextTop += this.getNodeHeight(node) + this.parentSpacing;

		if (node.expanded)
			for (var i = 0; i < nodes.length; i++)
				left = this.layOutHorizontally(nodes[i], left + (i > 0 ? this.siblingSpacing : 0), nextTop);

		if (node == this._root)
			return left;

		if (spanDiff < 0)
			setLeft -= Math.round(spanDiff / 2);

		this.setLayout(node, setLeft, top);

		if (spanDiff >= 0)
			left = node._frameRect.right;

		return left;

	}},

	layOutVertically: { value: function (node, left, top) {

		var spanDiff = this.getSpanDiff(node);
		var setTop = top;
		var nextLeft = left;
		var nodes = node.nodes;

		if (node == this._root && spanDiff <= this.padding * 2)
			top += this.padding;
		else if (spanDiff > 0)
			top += Math.round(spanDiff / 2);

		if (node != this._root)
			nextLeft += this.getNodeWidth(node) + this.parentSpacing;

		if (node.expanded)
			for (var i = 0; i < nodes.length; i++)
				top = this.layOutVertically(nodes[i], nextLeft, top + (i > 0 ? this.siblingSpacing : 0));

		if (node == this._root)
			return top;

		if (spanDiff < 0)
			setTop -= Math.round(spanDiff / 2);

		this.setLayout(node, left, setTop);

		if (spanDiff >= 0)
			top = node._frameRect.bottom;

		return top;

	}},

	setLayout: { value: function (node, left, top) {

		var style = node.element.style;
		var margin = node.style.margin;

		style.left = (left + margin.left) + "px";
		style.top = (top + margin.top) + "px";

		var rect = this.getFrameRectangle(node);
		var size = this._orgSize;

		var right = rect.right;
		var bottom = rect.bottom;

		if (!node.expanded && node.nodes.length > 0) {

			if (this.orientation == "vertical")
				right += 14;
			else
				bottom += 14;

		}

		if (right > size.width)
			size.width = right;

		if (bottom > size.height)
			size.height = bottom;

		node._frameRect = rect;

	}},

	getSpanDiff: { value: function (node) {

		if (node == this._root && this.autoSize)
			return 0;

		var span = this.getNodeSpan(node);

		if (!node.expanded)
			return span;

		return span - this.getOrgSpanOfChildNodes(node.nodes);

	}},

	getNodeSpan: { value: function (node) {

		if (this.orientation == "vertical")
			return this.getNodeHeight(node);
		else
			return this.getNodeWidth(node);

	}},

	getOrgSpan: { value: function (node) {

		if (node.element.style.display == "none")
			return 0;

		var nodeSpan = this.getNodeSpan(node);
		var orgSpan = node.expanded ? this.getOrgSpanOfChildNodes(node.nodes) : 0;

		return nodeSpan < orgSpan ? orgSpan : nodeSpan;

	}},

	getOrgSpanOfChildNodes: { value: function (nodes) {

		var total = 0;

		for (var i = 0; i < nodes.length; i++) {

			var span = this.getOrgSpan(nodes[i]);

			if (span == 0)
				continue;

			if (total > 0)
				total += this.siblingSpacing;

			total += span;

		}

		return total;

	}},

	getNodeWidth: { value: function (node) {

		if (node == this._root)
			return this.element.clientWidth;

		if (node.element.style.display == "none")
			return 0;

		var margin = node.style.margin;
		var width = node.element.offsetWidth + margin.left + margin.right;

		if (width % 2 == 0)
			width++;

		return width;

	}},

	getNodeHeight: { value: function (node) {

		if (node == this._root)
			return this.element.clientHeight;

		if (node.element.style.display == "none")
			return 0;

		var margin = node.style.margin;
		var height = node.element.offsetHeight + margin.top + margin.bottom;

		if (height % 2 == 0)
			height++;

		return height;

	}},

	renderShadows: { value: function (context, parent) {

		if (parent == null)
			return;

		if (!parent.expanded)
			return;

		var nodes = parent.nodes;

		for (var i = 0; i < nodes.length; i++) {

			var child = nodes[i];

			if (child.style.shadowVisible) {

				this.drawPath(context, child, 0);
				context.fill();

			}

			this.renderShadows(context, child);

		}

	}},

	renderRootLines: { value: function (context, mode) {

		if (!this.showRootLines)
			return;

		var nodes = this._root.nodes;

		for (var i = 0; i < nodes.length; i++) {

			var child = nodes[i];

			if (child.style.linkMode != mode)
				continue;

			var pt1 = this.getPointToParent(child);
			var pt2 = null;

			if (this.orientation == "vertical")
				pt2 = CheckBoxStudio.Point.create(pt1.x - this.parentSpacing, pt1.y);
			else
				pt2 = CheckBoxStudio.Point.create(pt1.x, pt1.y - this.parentSpacing);

			var stroke = context.createLinearGradient(pt2.x, pt2.y, pt1.x, pt1.y);

			stroke.addColorStop(0, "rgba(255, 255, 255, 0)");
			stroke.addColorStop(0.7, (mode == "background") ? this.backLinkColor : this.foreLinkColor);
			stroke.addColorStop(1, (mode == "background") ? this.backLinkColor : this.foreLinkColor);

			context.beginPath();
			context.moveTo(pt1.x + 0.5, pt1.y + 0.5);
			context.lineTo(pt2.x + 0.5, pt2.y + 0.5);

			context.strokeStyle = stroke;
			context.stroke();

		}

	}},

	renderLinks: { value: function (context, parent, mode) {

		if (parent == null)
			return;

		if (!parent.expanded)
			return;

		var nodes = parent.nodes;

		for (var i = 0; i < nodes.length; i++) {

			var child = nodes[i];

			if (parent != this._root && child.style.linkMode == mode) {

				var pt1 = this.getPointToParent(child);
				var pt2 = this.getPointToNodes(parent);

				context.beginPath();
				context.moveTo(pt1.x + 0.5, pt1.y + 0.5);

				if (this.linkLineStyle == "default") {

					var midSpace = Math.round(this.parentSpacing / 2);

					if (this.orientation == "vertical") {

						context.lineTo(pt1.x - midSpace + 0.5, pt1.y + 0.5);
						context.lineTo(pt1.x - midSpace + 0.5, pt2.y + 0.5);

					} else {

						context.lineTo(pt1.x + 0.5, pt1.y - midSpace + 0.5);
						context.lineTo(pt2.x + 0.5, pt1.y - midSpace + 0.5);

					}

				}

				context.lineTo(pt2.x + 0.5, pt2.y + 0.5);
				context.stroke();

			}

			this.renderLinks(context, child, mode);

		}

	}},

	renderFrames: { value: function (context, parent) {

		if (parent == null)
			return;

		if (!parent.expanded)
			return;

		var nodes = parent.nodes;

		for (var i = 0; i < nodes.length; i++) {

			var child = nodes[i];

			this.drawPath(context, child, 0.5);

			context.fillStyle = this.getFillStyle(context, child);
			context.fill();

			context.strokeStyle = child.style.borderColor;
			context.stroke();

			if (this.showSubArrows && !child.expanded && child.nodes.length > 0) {

				var rect = child._frameRect;
				var spacing = 7;

				context.beginPath();

				if (this.orientation == "vertical") {

					context.moveTo(rect.right + spacing + 7, rect.top + Math.floor(rect.height / 2) + 0.5);
					context.lineTo(rect.right + spacing, rect.top + Math.floor(rect.height / 2) - 6);
					context.lineTo(rect.right + spacing, rect.top + Math.floor(rect.height / 2) + 7);

				} else {

					context.moveTo(rect.left + Math.floor(rect.width / 2) + 0.5, rect.bottom + spacing + 7);
					context.lineTo(rect.left + Math.floor(rect.width / 2) - 6, rect.bottom + spacing);
					context.lineTo(rect.left + Math.floor(rect.width / 2) + 7, rect.bottom + spacing);

				}

				context.fillStyle = this.foreLinkColor;  //"black";
				context.fill();

			}

			this.renderFrames(context, child);

		}

	}},

	drawPath: { value: function (context, node, offset) {

		var rect = node._frameRect;
		var radius = this.getCornerRadius(node.style.margin);
		var corners = node.style.corners;

		context.beginPath();

		if (corners.topLeft == "squared") {

			context.moveTo(rect.left + offset, rect.top + offset);

		} else if (corners.topLeft == "beveled") {

			context.moveTo(rect.left + offset, rect.top + offset + radius);
			context.lineTo(rect.left + offset + radius, rect.top + offset);

		} else {

			context.arc(rect.left + offset + radius, rect.top + offset + radius, radius, Math.PI, 1.5 * Math.PI, false);

		}

		if (corners.topRight == "squared") {

			context.lineTo(rect.right - offset, rect.top + offset);

		} else if (corners.topRight == "beveled") {

			context.lineTo(rect.right - offset - radius, rect.top + offset);
			context.lineTo(rect.right - offset, rect.top + offset + radius);

		} else {

			context.arc(rect.right - offset - radius, rect.top + offset + radius, radius, 1.5 * Math.PI, 0, false);

		}

		if (corners.bottomRight == "squared") {

			context.lineTo(rect.right - offset, rect.bottom - offset);

		} else if (corners.bottomRight == "beveled") {

			context.lineTo(rect.right - offset, rect.bottom - offset - radius);
			context.lineTo(rect.right - offset - radius, rect.bottom - offset);

		} else {

			context.arc(rect.right - offset - radius, rect.bottom - offset - radius, radius, 0, 0.5 * Math.PI, false);

		}

		if (corners.bottomLeft == "squared") {

			context.lineTo(rect.left + offset, rect.bottom - offset);

		} else if (corners.bottomLeft == "beveled") {

			context.lineTo(rect.left + offset + radius, rect.bottom - offset);
			context.lineTo(rect.left + offset, rect.bottom - offset - radius);

		} else {

			context.arc(rect.left + offset + radius, rect.bottom - offset - radius, radius, 0.5 * Math.PI, Math.PI, false);

		}

		context.closePath();

	}},

	getCornerRadius: { value: function (margin) {

		var margins = [margin.left, margin.top, margin.right, margin.bottom];
		var radius = margins[0];

		for (var i = 0; i < margins.length; i++) {

			var value = margins[i];

			if (value < radius)
				radius = value;

		}

		return radius;

	}},

	getFillStyle: { value: function (context, node) {

		var fill = null;
		var rect = node._frameRect;
		var style = node.style;
		var mode = style.gradientMode;

		if (mode == "horizontal")
			fill = context.createLinearGradient(rect.left, rect.top, rect.right, rect.top);
		else if (mode == "forwarddiagonal")	
			fill = context.createLinearGradient(rect.left, rect.top, rect.right, rect.bottom);
		else if (mode == "backwarddiagonal")	
			fill = context.createLinearGradient(rect.right, rect.top, rect.left, rect.bottom);
		else
			fill = context.createLinearGradient(rect.left, rect.top, rect.left, rect.bottom);

		fill.addColorStop(0, style.startColor);
		fill.addColorStop(1, style.endColor);

		return fill;

	}},

	getFrameRectangle: { value: function (node) {

		var elem = node.element;
		var margin = node.style.margin;

		var x = elem.offsetLeft - margin.left;
		var y = elem.offsetTop - margin.top;

		var width = elem.offsetWidth + margin.left + margin.right;
		var height = elem.offsetHeight + margin.top + margin.bottom;

		if (this.orientation == "vertical") {

			if (height % 2 == 0)
				height++;

		} else {

			if (width % 2 == 0)
				width++;	

		}

		return {
			left: x,
			top: y,
			width: width,
			height: height,
			right: x + width,
			bottom: y + height
		};

	}},

	getPointToParent: { value: function (node) {

		var rect = node._frameRect;
		var x = rect.left;
		var y = rect.top;

		if (this.orientation == "vertical")
			y = rect.top + Math.floor(rect.height / 2);
		else
			x = rect.left + Math.floor(rect.width / 2);

		return CheckBoxStudio.Point.create(x, y);

	}},

	getPointToNodes: { value: function (node) {

		var rect = node._frameRect;
		var x = rect.left + Math.floor(rect.width / 2);
		var y = rect.top + Math.floor(rect.height / 2);

		if (this.orientation == "vertical") {

			if (rect.width > rect.height)
				x = rect.right - Math.floor(rect.height / 2);

		} else {

			if (rect.height > rect.width)
				y = rect.bottom - Math.floor(rect.width / 2);

		}

		return CheckBoxStudio.Point.create(x, y);

	}},

	toString: { value: function () {

		return "[object CheckBoxStudio.OrgPanel]";

	}}

});

CheckBoxStudio.OrgNodeStyle._default = CheckBoxStudio.OrgNodeStyle.create("_defaultStyle");

document.addEventListener("DOMContentLoaded", function () {

	var elems = document.getElementsByTagName("style"); // must load styles before panels...

	for (var i = 0; i < elems.length; i++) {

		var elem = elems[i];
		var attr = elem.getAttribute("cb:orgnodestyle");

		if (attr == null)
			continue;

		CheckBoxStudio.OrgNodeStyle.extend(elem);
		CheckBoxStudio.addNodeStyle(elem.orgNodeStyle);

	}

	elems = document.getElementsByTagName("div");

	for (var i = 0; i < elems.length; i++) {

		var elem = elems[i];
		var attr = elem.getAttribute("cb:orgpanel");

		if (attr == null)
			continue;

		CheckBoxStudio.OrgPanel.extend(elem);

	}

}, false);
