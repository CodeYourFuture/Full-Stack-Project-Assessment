import { Vector } from "./Vector";
export class Vector3d extends Vector {
    constructor(xOrCoords, y, z) {
        super(xOrCoords, y);
        if (typeof xOrCoords !== "number" && xOrCoords) {
            this.z = xOrCoords.z;
        }
        else if (z !== undefined) {
            this.z = z;
        }
        else {
            throw new Error("tsParticles - Vector not initialized correctly");
        }
    }
    static clone(source) {
        return Vector3d.create(source.x, source.y, source.z);
    }
    static create(x, y, z) {
        return new Vector3d(x, y, z);
    }
    static get origin() {
        return Vector3d.create(0, 0, 0);
    }
    add(v) {
        return v instanceof Vector3d ? Vector3d.create(this.x + v.x, this.y + v.y, this.z + v.z) : super.add(v);
    }
    addTo(v) {
        super.addTo(v);
        if (v instanceof Vector3d) {
            this.z += v.z;
        }
    }
    sub(v) {
        return v instanceof Vector3d ? Vector3d.create(this.x - v.x, this.y - v.y, this.z - v.z) : super.sub(v);
    }
    subFrom(v) {
        super.subFrom(v);
        if (v instanceof Vector3d) {
            this.z -= v.z;
        }
    }
    mult(n) {
        return Vector3d.create(this.x * n, this.y * n, this.z * n);
    }
    multTo(n) {
        super.multTo(n);
        this.z *= n;
    }
    div(n) {
        return Vector3d.create(this.x / n, this.y / n, this.z / n);
    }
    divTo(n) {
        super.divTo(n);
        this.z /= n;
    }
    copy() {
        return Vector3d.clone(this);
    }
    setTo(v) {
        super.setTo(v);
        const v3d = v;
        if (v3d.z !== undefined) {
            this.z = v3d.z;
        }
    }
}
