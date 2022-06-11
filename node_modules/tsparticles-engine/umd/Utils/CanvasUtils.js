(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./ColorUtils"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.alterHsl = exports.drawEllipse = exports.drawParticlePlugin = exports.drawPlugin = exports.drawShapeAfterEffect = exports.drawShape = exports.drawParticle = exports.drawGrabLine = exports.gradient = exports.drawConnectLine = exports.clear = exports.paintBase = exports.drawTriangle = exports.drawLine = void 0;
    const ColorUtils_1 = require("./ColorUtils");
    function drawLine(context, begin, end) {
        context.beginPath();
        context.moveTo(begin.x, begin.y);
        context.lineTo(end.x, end.y);
        context.closePath();
    }
    exports.drawLine = drawLine;
    function drawTriangle(context, p1, p2, p3) {
        context.beginPath();
        context.moveTo(p1.x, p1.y);
        context.lineTo(p2.x, p2.y);
        context.lineTo(p3.x, p3.y);
        context.closePath();
    }
    exports.drawTriangle = drawTriangle;
    function paintBase(context, dimension, baseColor) {
        context.save();
        context.fillStyle = baseColor !== null && baseColor !== void 0 ? baseColor : "rgba(0,0,0,0)";
        context.fillRect(0, 0, dimension.width, dimension.height);
        context.restore();
    }
    exports.paintBase = paintBase;
    function clear(context, dimension) {
        context.clearRect(0, 0, dimension.width, dimension.height);
    }
    exports.clear = clear;
    function drawConnectLine(context, width, lineStyle, begin, end) {
        context.save();
        drawLine(context, begin, end);
        context.lineWidth = width;
        context.strokeStyle = lineStyle;
        context.stroke();
        context.restore();
    }
    exports.drawConnectLine = drawConnectLine;
    function gradient(context, p1, p2, opacity) {
        const gradStop = Math.floor(p2.getRadius() / p1.getRadius()), color1 = p1.getFillColor(), color2 = p2.getFillColor();
        if (!color1 || !color2) {
            return;
        }
        const sourcePos = p1.getPosition(), destPos = p2.getPosition(), midRgb = (0, ColorUtils_1.colorMix)(color1, color2, p1.getRadius(), p2.getRadius()), grad = context.createLinearGradient(sourcePos.x, sourcePos.y, destPos.x, destPos.y);
        grad.addColorStop(0, (0, ColorUtils_1.getStyleFromHsl)(color1, opacity));
        grad.addColorStop(gradStop > 1 ? 1 : gradStop, (0, ColorUtils_1.getStyleFromRgb)(midRgb, opacity));
        grad.addColorStop(1, (0, ColorUtils_1.getStyleFromHsl)(color2, opacity));
        return grad;
    }
    exports.gradient = gradient;
    function drawGrabLine(context, width, begin, end, colorLine, opacity) {
        context.save();
        drawLine(context, begin, end);
        context.strokeStyle = (0, ColorUtils_1.getStyleFromRgb)(colorLine, opacity);
        context.lineWidth = width;
        context.stroke();
        context.restore();
    }
    exports.drawGrabLine = drawGrabLine;
    function drawParticle(container, context, particle, delta, colorStyles, backgroundMask, composite, radius, opacity, shadow) {
        var _a, _b, _c, _d;
        const pos = particle.getPosition(), tiltOptions = particle.options.tilt, rollOptions = particle.options.roll;
        context.save();
        if (tiltOptions.enable || rollOptions.enable) {
            const roll = rollOptions.enable && particle.roll, tilt = tiltOptions.enable && particle.tilt, rollHorizontal = roll && (rollOptions.mode === "horizontal" || rollOptions.mode === "both"), rollVertical = roll && (rollOptions.mode === "vertical" || rollOptions.mode === "both");
            context.setTransform(rollHorizontal ? Math.cos(particle.roll.angle) : 1, tilt ? Math.cos(particle.tilt.value) * particle.tilt.cosDirection : 0, tilt ? Math.sin(particle.tilt.value) * particle.tilt.sinDirection : 0, rollVertical ? Math.sin(particle.roll.angle) : 1, pos.x, pos.y);
        }
        else {
            context.translate(pos.x, pos.y);
        }
        context.beginPath();
        const angle = ((_b = (_a = particle.rotate) === null || _a === void 0 ? void 0 : _a.value) !== null && _b !== void 0 ? _b : 0) + (particle.options.rotate.path ? particle.velocity.angle : 0);
        if (angle !== 0) {
            context.rotate(angle);
        }
        if (backgroundMask) {
            context.globalCompositeOperation = composite;
        }
        const shadowColor = particle.shadowColor;
        if (shadow.enable && shadowColor) {
            context.shadowBlur = shadow.blur;
            context.shadowColor = (0, ColorUtils_1.getStyleFromRgb)(shadowColor);
            context.shadowOffsetX = shadow.offset.x;
            context.shadowOffsetY = shadow.offset.y;
        }
        if (colorStyles.fill) {
            context.fillStyle = colorStyles.fill;
        }
        const stroke = particle.stroke;
        context.lineWidth = (_c = particle.strokeWidth) !== null && _c !== void 0 ? _c : 0;
        if (colorStyles.stroke) {
            context.strokeStyle = colorStyles.stroke;
        }
        drawShape(container, context, particle, radius, opacity, delta);
        if (((_d = stroke === null || stroke === void 0 ? void 0 : stroke.width) !== null && _d !== void 0 ? _d : 0) > 0) {
            context.stroke();
        }
        if (particle.close) {
            context.closePath();
        }
        if (particle.fill) {
            context.fill();
        }
        context.restore();
        context.save();
        if (tiltOptions.enable && particle.tilt) {
            context.setTransform(1, Math.cos(particle.tilt.value) * particle.tilt.cosDirection, Math.sin(particle.tilt.value) * particle.tilt.sinDirection, 1, pos.x, pos.y);
        }
        else {
            context.translate(pos.x, pos.y);
        }
        if (angle !== 0) {
            context.rotate(angle);
        }
        if (backgroundMask) {
            context.globalCompositeOperation = composite;
        }
        drawShapeAfterEffect(container, context, particle, radius, opacity, delta);
        context.restore();
    }
    exports.drawParticle = drawParticle;
    function drawShape(container, context, particle, radius, opacity, delta) {
        if (!particle.shape) {
            return;
        }
        const drawer = container.drawers.get(particle.shape);
        if (!drawer) {
            return;
        }
        drawer.draw(context, particle, radius, opacity, delta, container.retina.pixelRatio);
    }
    exports.drawShape = drawShape;
    function drawShapeAfterEffect(container, context, particle, radius, opacity, delta) {
        if (!particle.shape) {
            return;
        }
        const drawer = container.drawers.get(particle.shape);
        if (!(drawer === null || drawer === void 0 ? void 0 : drawer.afterEffect)) {
            return;
        }
        drawer.afterEffect(context, particle, radius, opacity, delta, container.retina.pixelRatio);
    }
    exports.drawShapeAfterEffect = drawShapeAfterEffect;
    function drawPlugin(context, plugin, delta) {
        if (!plugin.draw) {
            return;
        }
        context.save();
        plugin.draw(context, delta);
        context.restore();
    }
    exports.drawPlugin = drawPlugin;
    function drawParticlePlugin(context, plugin, particle, delta) {
        if (!plugin.drawParticle) {
            return;
        }
        context.save();
        plugin.drawParticle(context, particle, delta);
        context.restore();
    }
    exports.drawParticlePlugin = drawParticlePlugin;
    function drawEllipse(context, particle, fillColorValue, radius, opacity, width, rotation, start, end) {
        if (width <= 0) {
            return;
        }
        const pos = particle.getPosition();
        if (fillColorValue) {
            context.strokeStyle = (0, ColorUtils_1.getStyleFromHsl)(fillColorValue, opacity);
        }
        context.lineWidth = width;
        const rotationRadian = (rotation * Math.PI) / 180;
        context.beginPath();
        context.ellipse(pos.x, pos.y, radius / 2, radius * 2, rotationRadian, start, end);
        context.stroke();
    }
    exports.drawEllipse = drawEllipse;
    function alterHsl(color, type, value) {
        return {
            h: color.h,
            s: color.s,
            l: color.l + (type === "darken" ? -1 : 1) * value,
        };
    }
    exports.alterHsl = alterHsl;
});
