const {ccclass, property} = cc._decorator
// 玩家朝向
export enum PlayerDirection {
    Down = 1,
    Up,
    Left,
    Right
}
// 单例
export default class Input{
    private static instance:Input = null;
    // 水平轴
    horizontal:number = 0;
    // 垂直轴
    vertical:number = 0;
    // 射击
    isShoot:number = 0;
    // 记录当前玩家朝向
    currentDirection: PlayerDirection = PlayerDirection.Down;

    static get Instance(){
        if(this.instance == null){
            this.instance = new Input();
        }
        return this.instance
    }
    
    constructor(){
        // 键盘按下
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN,(event)=>{
            if(event.keyCode == cc.macro.KEY.w){
                this.vertical = 1;
                this.setCurrentDirection(PlayerDirection.Up);
            }else if(event.keyCode == cc.macro.KEY.s){
                this.vertical = -1;
                this.setCurrentDirection(PlayerDirection.Down);
            }else if (event.keyCode == cc.macro.KEY.a){
                this.horizontal = -1;
                this.setCurrentDirection(PlayerDirection.Left);
            }else if (event.keyCode == cc.macro.KEY.d){
                this.horizontal = 1;
                this.setCurrentDirection(PlayerDirection.Right);
            }else if (event.keyCode == cc.macro.KEY.j){
                this.isShoot = 1;
            }
        })

        // 键盘抬起
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP,(event)=>{
            if(event.keyCode == cc.macro.KEY.w && this.vertical==1){
                this.vertical = 0;
            }else if(event.keyCode == cc.macro.KEY.s && this.vertical == -1){
                this.vertical = 0;
            }else if (event.keyCode == cc.macro.KEY.a && this.horizontal == -1){
                this.horizontal = 0;
            }else if (event.keyCode == cc.macro.KEY.d && this.horizontal == 1){
                this.horizontal = 0;
            }else if ( event.keyCode == cc.macro.KEY.j  && this.isShoot ==1){
                this.isShoot = 0;
            }
        })
    }

    // 更改玩家朝向
    private setCurrentDirection(direction: PlayerDirection) {
        if (this.currentDirection !== direction) {
            this.currentDirection = direction;
            // 在这里处理切换朝向状态的逻辑
        }
    }


}
