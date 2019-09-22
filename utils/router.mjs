class Route {

    constructor(config) {
        this.path = config.path;
        this.path_type = config.path_type;
        this.route_type = config.route_type || 'default';
        this.component = config.component;
        this.component_type = config.component_type;

        this.render.bind(this);
    }

    render() {
        return {
            obj: this.component,
            type: this.component_type
        };
    }
}

class Router {

    constructor(config) {
        this.mode = config.mode;
        this.mount_node = config.mount_node;
        this.routes = {};
        this.path_equiv = {};

        window.addEventListener(
            'load',
            this.render.bind(this)
        );
        window.addEventListener(
            'hashchange',
            this.render.bind(this)
        )
    }

    mount(node) {
        this.mount_node = node;
    }

    register(path, component, type) {
        let route = new Route({
            path: path,
            path_type: this.mode,
            component: component,
            component_type: type
        });
        this.routes[path] = route;
    }

    register_equal(path, equiv) {
        this.path_equiv[path] = equiv;
    }

    render() {
        let path = window.location.hash;
        let final_path = this.path_equiv[path] || path;
        let route = this.routes[final_path];

        if(route){
            let render_content = route.render();
            if(render_content.type === "handle"){
                this.mount_node.innerHTML = render_content.obj();
            }else if(render_content.type === "promise"){
                render_content.obj().then(text => { this.mount_node.innerHTML = text });
            }else{
                this.mount_node.innerHTML = render_content.obj;
            }
        }else{
            this.mount_node.innerHTML = "<div>404</div>";
        }
        
    }
}

export { Router };