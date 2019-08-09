let app = null;

const container_main = new PIXI.Container();
const container_standart = new PIXI.Container();
const container_LayerAMiddle = new PIXI.Container();
const container_LayerBMiddle = new PIXI.Container();


function resize() {
    app.renderer.resize(window.innerWidth, window.innerHeight);
    if(window.innerWidth-container_main.width<window.innerHeight-container_main.height){
        let old_w = container_main.width;
        container_main.width = window.innerWidth;
        container_main.height = container_main.height / (old_w / container_main.width);
    }else{
        let old_h = container_main.height;
        container_main.height = window.innerHeight;
        container_main.width = container_main.width / (old_h / container_main.height);
    }
    container_main.x = window.innerWidth / 2 - container_main.width / 2;
    container_main.y = window.innerHeight / 2 - container_main.height / 2;
}


async function loadData(){
    let level = await axios.get("level.json");
    let slots = level.data.skins.slots;
    let layers = {standart:container_standart,LayerAMiddle:container_LayerAMiddle,LayerBMiddle:container_LayerBMiddle};

    for (let slot of slots){
        let container = layers[slot.layer];
        let filetype = slot.layer === "standart"?"jpg":"png";
            let texture = PIXI.Texture.from('images/' + slot.name+'.'+filetype);
            let sprite = new PIXI.Sprite(texture);
            sprite.x=slot.x;
            sprite.y=slot.y;
            sprite.width=slot.width;
            sprite.height=slot.height;
            sprite.anchor.set(0.5);
            container.addChild(sprite);
    }
}




window.onresize=resize;
window.onload = async function(){

    app = new PIXI.Application({    autoResize: true    });

    app.stage.addChild(container_main);
    container_main.addChild(container_standart);
    container_main.addChild(container_LayerAMiddle);
    container_main.addChild(container_LayerBMiddle);

    document.body.appendChild(app.view);

    await loadData();

    resize();

};


