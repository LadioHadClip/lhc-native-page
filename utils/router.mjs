class Route {

    constructor(config) {
        this.path = config.path;
        this.path_type = config.path_type;
        this.route_type = config.route_type || 'default';
        this.component = config.component;
        this.component_type = config.component_type;
        this.after_hook = config.after_hook;

        this.render.bind(this);
    }

    render() {
        return {
            obj: this.component,
            type: this.component_type,
            after_hook: this.after_hook
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
        // window.addEventListener(
        //     'refresh',
        //     this.render.bind(this)
        // )
    }

    mount(node) {
        this.mount_node = node;
    }

    register(path, component, type, hook=(x=>x)) {
        path = '#' + path;
        let route = new Route({
            path: path,
            path_type: this.mode,
            component: component,
            component_type: type,
            after_hook: hook
        });
        this.routes[path] = route;
    }

    register_equal(path, equiv) {
        equiv = '#' + equiv;
        this.path_equiv[path] = equiv;
    }

    match(path) {
        let paths = path.split('#');
        let final_path = { path: null, anchor: null, type: '404' };
        
        if(paths.length == 1){
            final_path.path = this.routes[this.path_equiv[paths[0]] || paths[0]];
            final_path.type = final_path.path ? 'route' : final_path.type;
        }else if(paths.length == 2){
            let cur_path = '#' + paths[1];
            final_path.path = this.routes[this.path_equiv[cur_path] || cur_path];
            if(final_path.path){
                final_path.type = 'route';
            }else{
                cur_path = paths[0];
                final_path.path = this.routes[this.path_equiv[cur_path] || cur_path];
                final_path.type = final_path.path ? 'anchor' : final_path.type;
                final_path.anchor = paths[1];
            }
        }else if(paths.length == 3){
            let cur_path = '#' + paths[1];
            final_path.path = this.routes[this.path_equiv[cur_path] || cur_path];
            final_path.type = final_path.path ? 'anchor' : final_path.type;
            final_path.anchor = paths[2];
        }
        return final_path;
    }

    async render() {
        // TODO: route matching
        // Possible Pipeline: 
        // 1. split: normal ('', 'content') then anchor ('', 'content', 'anchor')
        //      for normal, we find content in map/eq-map;
        //      for anchor, we first find content, then jump to anchor;
        //      for (''), it's normal with eq-map => ('', 'content_eq('')')
        //      for ('', 'anchor'), we try normal, then anchor
        //      in conclusion:
        //          normal anchor(#=3),
        //          normal route(#=2)
        //          abnormal anchor(#=2, with a failure)
        //          abnormal route(#=1, with a eq-map)
        // 2. render: for failure, we return custom 404; for success, we render
        let path_match = this.match(window.location.hash);

        if(path_match.type !== "404"){
            let route = path_match.path;
            let render_content = route.render();
            if(render_content.type === "handle"){
                this.mount_node.innerHTML = render_content.after_hook(
                    render_content.obj()
                );
            }else if(render_content.type === "promise"){
                await render_content.obj()
                    .then(text => { this.mount_node.innerHTML = text })
                    .then(() => { render_content.after_hook(this.mount_node); });
            }else{
                this.mount_node.innerHTML = render_content.after_hook(
                    render_content.obj
                );
            }
            window.alert(path_match.type);
            if(path_match.type === "route"){
                window.scrollTo(0, 0);
            }else{
                let node = document.getElementById(path_match.anchor);
                if(node){
                    node.scrollIntoView();
                    if(window.scrollY)
                        window.scroll(0, window.scrollY - 100);
                }else{
                    this.mount_node.innerHTML = "<div>404</div>";
                }
            }
        }else{
            this.mount_node.innerHTML = "<div>404</div>";
        }    
    }
}

export { Router };