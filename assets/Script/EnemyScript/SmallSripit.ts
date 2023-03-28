import EnemyBase from "./EnenyBase";

const {ccclass, property} = cc._decorator;
@ccclass
export default class SmallSpirit extends EnemyBase{


    // onLoad () {}

    start () {
        // 初始化一些属性和组件
        // this.node.group = "enemy"; // 设置节点分组为enemy
        // this.node.addComponent(cc.RigidBody); // 添加刚体组件
        // this.node.addComponent(cc.PhysicsBoxCollider); // 添加物理碰撞盒组件
        // this.node.getComponent(cc.PhysicsBoxCollider).apply(); // 应用物理碰撞盒组件的属性
        // this.node.on("hit", this.onHit, this); // 监听hit事件（你需要自己派发）
        // this.node.on("die", this.onDie, this); // 监听die事件（你需要自己派发）
    }

    update(dt) {
        this.move(dt)
    }
    // 初始化设置属性
    init(player:cc.Node,enemyPool:cc.NodePool){
        //
        this.player = player;
        this.enemyPool = enemyPool;
        //
        this.health = 10;
        this.moveSpeed = 1;
        this.node.active = true

    }
    // 怪向人物移动
    move(dt){
        super.move(dt)
        if(this.player && this.node.active){
            let playerPos = this.player.getPosition();
            let enemyPos = this.node.getPosition();
            let direction = new cc.Vec2()
            // 计算敌人和玩家的方向
            cc.Vec2.subtract(direction,playerPos,enemyPos);
            //  归一化
            direction.normalize();
            // 计算方向的移动速度
            let velocity = new cc.Vec2();
            cc.Vec2.multiplyScalar(velocity,direction,this.moveSpeed*dt)
            // 增加速度给敌人的位置
            let newPos = new cc.Vec2();
            cc.Vec2.add(newPos,enemyPos,velocity)
            this.node.setPosition(newPos)

        }
    }
    // 受击
    onHit(damage:number){
        this.health -= damage
        if (this.health <= 0){
            this.node.emit("die")
        }
    }

    onDie(){
        // 死亡动画加到这里
        this.enemyPool.put(this.node)
    }

}
