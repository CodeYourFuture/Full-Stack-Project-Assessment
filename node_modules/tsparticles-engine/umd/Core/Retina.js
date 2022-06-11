(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../Utils/NumberUtils", "../Utils/Utils"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Retina = void 0;
    const NumberUtils_1 = require("../Utils/NumberUtils");
    const Utils_1 = require("../Utils/Utils");
    class Retina {
        constructor(container) {
            this.container = container;
        }
        init() {
            const container = this.container, options = container.actualOptions;
            this.pixelRatio = !options.detectRetina || (0, Utils_1.isSsr)() ? 1 : window.devicePixelRatio;
            const motionOptions = this.container.actualOptions.motion;
            if (motionOptions && (motionOptions.disable || motionOptions.reduce.value)) {
                if ((0, Utils_1.isSsr)() || typeof matchMedia === "undefined" || !matchMedia) {
                    this.reduceFactor = 1;
                }
                else {
                    const mediaQuery = matchMedia("(prefers-reduced-motion: reduce)");
                    if (mediaQuery) {
                        this.handleMotionChange(mediaQuery);
                        const handleChange = () => {
                            this.handleMotionChange(mediaQuery);
                            container.refresh().catch(() => {
                            });
                        };
                        if (mediaQuery.addEventListener !== undefined) {
                            mediaQuery.addEventListener("change", handleChange);
                        }
                        else if (mediaQuery.addListener !== undefined) {
                            mediaQuery.addListener(handleChange);
                        }
                    }
                }
            }
            else {
                this.reduceFactor = 1;
            }
            const ratio = this.pixelRatio;
            if (container.canvas.element) {
                const element = container.canvas.element;
                container.canvas.size.width = element.offsetWidth * ratio;
                container.canvas.size.height = element.offsetHeight * ratio;
            }
            const particles = options.particles;
            this.attractDistance = (0, NumberUtils_1.getRangeValue)(particles.move.attract.distance) * ratio;
            this.linksDistance = particles.links.distance * ratio;
            this.linksWidth = particles.links.width * ratio;
            this.sizeAnimationSpeed = (0, NumberUtils_1.getRangeValue)(particles.size.animation.speed) * ratio;
            this.maxSpeed = (0, NumberUtils_1.getRangeValue)(particles.move.gravity.maxSpeed) * ratio;
            const modes = options.interactivity.modes;
            this.connectModeDistance = modes.connect.distance * ratio;
            this.connectModeRadius = modes.connect.radius * ratio;
            this.grabModeDistance = modes.grab.distance * ratio;
            this.repulseModeDistance = modes.repulse.distance * ratio;
            this.bounceModeDistance = modes.bounce.distance * ratio;
            this.attractModeDistance = modes.attract.distance * ratio;
            this.slowModeRadius = modes.slow.radius * ratio;
            this.bubbleModeDistance = modes.bubble.distance * ratio;
            if (modes.bubble.size) {
                this.bubbleModeSize = modes.bubble.size * ratio;
            }
        }
        initParticle(particle) {
            const options = particle.options, ratio = this.pixelRatio, moveDistance = options.move.distance, props = particle.retina;
            props.attractDistance = (0, NumberUtils_1.getRangeValue)(options.move.attract.distance) * ratio;
            props.linksDistance = options.links.distance * ratio;
            props.linksWidth = options.links.width * ratio;
            props.moveDrift = (0, NumberUtils_1.getRangeValue)(options.move.drift) * ratio;
            props.moveSpeed = (0, NumberUtils_1.getRangeValue)(options.move.speed) * ratio;
            props.sizeAnimationSpeed = (0, NumberUtils_1.getRangeValue)(options.size.animation.speed) * ratio;
            const maxDistance = props.maxDistance;
            maxDistance.horizontal = moveDistance.horizontal !== undefined ? moveDistance.horizontal * ratio : undefined;
            maxDistance.vertical = moveDistance.vertical !== undefined ? moveDistance.vertical * ratio : undefined;
            props.maxSpeed = (0, NumberUtils_1.getRangeValue)(options.move.gravity.maxSpeed) * ratio;
        }
        handleMotionChange(mediaQuery) {
            const options = this.container.actualOptions;
            if (mediaQuery.matches) {
                const motion = options.motion;
                this.reduceFactor = motion.disable ? 0 : motion.reduce.value ? 1 / motion.reduce.factor : 1;
            }
            else {
                this.reduceFactor = 1;
            }
        }
    }
    exports.Retina = Retina;
});
