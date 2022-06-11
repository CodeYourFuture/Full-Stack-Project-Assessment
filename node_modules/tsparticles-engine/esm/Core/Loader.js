var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Loader_engine;
import { Container } from "./Container";
import { generatedAttribute } from "./Utils/Constants";
import { itemFromArray } from "../Utils/Utils";
function fetchError(statusCode) {
    console.error(`Error tsParticles - fetch status: ${statusCode}`);
    console.error("Error tsParticles - File config not found");
}
export class Loader {
    constructor(engine) {
        _Loader_engine.set(this, void 0);
        __classPrivateFieldSet(this, _Loader_engine, engine, "f");
    }
    dom() {
        return __classPrivateFieldGet(this, _Loader_engine, "f").domArray;
    }
    domItem(index) {
        const dom = this.dom();
        const item = dom[index];
        if (item && !item.destroyed) {
            return item;
        }
        dom.splice(index, 1);
    }
    async loadOptions(params) {
        var _a, _b, _c;
        const tagId = (_a = params.tagId) !== null && _a !== void 0 ? _a : `tsparticles${Math.floor(Math.random() * 10000)}`, { options, index } = params;
        let domContainer = (_b = params.element) !== null && _b !== void 0 ? _b : document.getElementById(tagId);
        if (!domContainer) {
            domContainer = document.createElement("div");
            domContainer.id = tagId;
            (_c = document.querySelector("body")) === null || _c === void 0 ? void 0 : _c.append(domContainer);
        }
        const currentOptions = options instanceof Array ? itemFromArray(options, index) : options, dom = this.dom(), oldIndex = dom.findIndex((v) => v.id === tagId);
        if (oldIndex >= 0) {
            const old = this.domItem(oldIndex);
            if (old && !old.destroyed) {
                old.destroy();
                dom.splice(oldIndex, 1);
            }
        }
        let canvasEl;
        if (domContainer.tagName.toLowerCase() === "canvas") {
            canvasEl = domContainer;
            canvasEl.dataset[generatedAttribute] = "false";
        }
        else {
            const existingCanvases = domContainer.getElementsByTagName("canvas");
            if (existingCanvases.length) {
                canvasEl = existingCanvases[0];
                canvasEl.dataset[generatedAttribute] = "false";
            }
            else {
                canvasEl = document.createElement("canvas");
                canvasEl.dataset[generatedAttribute] = "true";
                canvasEl.style.width = "100%";
                canvasEl.style.height = "100%";
                domContainer.appendChild(canvasEl);
            }
        }
        const newItem = new Container(__classPrivateFieldGet(this, _Loader_engine, "f"), tagId, currentOptions);
        if (oldIndex >= 0) {
            dom.splice(oldIndex, 0, newItem);
        }
        else {
            dom.push(newItem);
        }
        newItem.canvas.loadCanvas(canvasEl);
        await newItem.start();
        return newItem;
    }
    async loadRemoteOptions(params) {
        const { url: jsonUrl, index } = params, url = jsonUrl instanceof Array ? itemFromArray(jsonUrl, index) : jsonUrl;
        if (!url) {
            return;
        }
        const response = await fetch(url);
        if (!response.ok) {
            fetchError(response.status);
            return;
        }
        const data = await response.json();
        return this.loadOptions({
            tagId: params.tagId,
            element: params.element,
            index,
            options: data,
        });
    }
    load(tagId, options, index) {
        const params = { index };
        if (typeof tagId === "string") {
            params.tagId = tagId;
        }
        else {
            params.options = tagId;
        }
        if (typeof options === "number") {
            params.index = options !== null && options !== void 0 ? options : params.index;
        }
        else {
            params.options = options !== null && options !== void 0 ? options : params.options;
        }
        return this.loadOptions(params);
    }
    async set(id, domContainer, options, index) {
        const params = { index };
        if (typeof id === "string") {
            params.tagId = id;
        }
        else {
            params.element = id;
        }
        if (domContainer instanceof HTMLElement) {
            params.element = domContainer;
        }
        else {
            params.options = domContainer;
        }
        if (typeof options === "number") {
            params.index = options;
        }
        else {
            params.options = options !== null && options !== void 0 ? options : params.options;
        }
        return this.loadOptions(params);
    }
    async loadJSON(tagId, jsonUrl, index) {
        let url, id;
        if (typeof jsonUrl === "number" || jsonUrl === undefined) {
            url = tagId;
        }
        else {
            id = tagId;
            url = jsonUrl;
        }
        return this.loadRemoteOptions({ tagId: id, url, index });
    }
    async setJSON(id, domContainer, jsonUrl, index) {
        let url, newId, newIndex, element;
        if (id instanceof HTMLElement) {
            element = id;
            url = domContainer;
            newIndex = jsonUrl;
        }
        else {
            newId = id;
            element = domContainer;
            url = jsonUrl;
            newIndex = index;
        }
        return this.loadRemoteOptions({ tagId: newId, url, index: newIndex, element });
    }
    setOnClickHandler(callback) {
        const dom = this.dom();
        if (!dom.length) {
            throw new Error("Can only set click handlers after calling tsParticles.load() or tsParticles.loadJSON()");
        }
        for (const domItem of dom) {
            domItem.addClickHandler(callback);
        }
    }
    addEventListener(type, listener) {
        __classPrivateFieldGet(this, _Loader_engine, "f").eventDispatcher.addEventListener(type, listener);
    }
    removeEventListener(type, listener) {
        __classPrivateFieldGet(this, _Loader_engine, "f").eventDispatcher.removeEventListener(type, listener);
    }
    dispatchEvent(type, args) {
        __classPrivateFieldGet(this, _Loader_engine, "f").eventDispatcher.dispatchEvent(type, args);
    }
}
_Loader_engine = new WeakMap();
