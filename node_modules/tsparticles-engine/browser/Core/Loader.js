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
/**
 * Default fetch error catcher
 * @param statusCode the fecth status code error
 */
function fetchError(statusCode) {
    console.error(`Error tsParticles - fetch status: ${statusCode}`);
    console.error("Error tsParticles - File config not found");
}
/**
 * Main class for creating the [[Container]] objects
 * @category Core
 */
export class Loader {
    /**
     * Loader constructor, assigns the engine
     * @param engine the engine containing this Loader instance
     */
    constructor(engine) {
        /**
         * The engine containing this Loader instance
         * @private
         */
        _Loader_engine.set(this, void 0);
        __classPrivateFieldSet(this, _Loader_engine, engine, "f");
    }
    /**
     * All the [[Container]] objects loaded
     */
    dom() {
        return __classPrivateFieldGet(this, _Loader_engine, "f").domArray;
    }
    /**
     * Retrieves a [[Container]] from all the objects loaded
     * @param index the object index
     */
    domItem(index) {
        const dom = this.dom();
        const item = dom[index];
        if (item && !item.destroyed) {
            return item;
        }
        dom.splice(index, 1);
    }
    /**
     * Starts an animation in a container, starting from the given options
     * @param params all the parameters required for loading options in the current animation
     */
    async loadOptions(params) {
        var _a, _b, _c;
        const tagId = (_a = params.tagId) !== null && _a !== void 0 ? _a : `tsparticles${Math.floor(Math.random() * 10000)}`, { options, index } = params;
        /* elements */
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
            /* get existing canvas if present, otherwise a new one will be created */
            if (existingCanvases.length) {
                canvasEl = existingCanvases[0];
                canvasEl.dataset[generatedAttribute] = "false";
            }
            else {
                /* create canvas element */
                canvasEl = document.createElement("canvas");
                canvasEl.dataset[generatedAttribute] = "true";
                /* set size canvas */
                canvasEl.style.width = "100%";
                canvasEl.style.height = "100%";
                /* append canvas */
                domContainer.appendChild(canvasEl);
            }
        }
        /* launch tsParticles */
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
    /**
     * Starts an animation in a container, starting from the given remote options
     * @param params all the parameters required for loading a remote url into options in the current animation
     */
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
    /**
     * Loads the provided options to create a [[Container]] object.
     * @param tagId the particles container element id
     * @param options the options object to initialize the [[Container]]
     * @param index if an options array is provided, this will retrieve the exact index of that array
     */
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
    /**
     * Loads the provided options to create a [[Container]] object.
     * @param id the particles container element id
     * @param domContainer the dom container
     * @param options the options object to initialize the [[Container]]
     * @param index if an options array is provided, this will retrieve the exact index of that array
     */
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
    /**
     * Loads the provided json with a GET request. The content will be used to create a [[Container]] object.
     * This method is async, so if you need a callback refer to JavaScript function `fetch`
     * @param tagId the particles container element id
     * @param jsonUrl the json path (or paths array) to use in the GET request
     * @param index the index of the paths array, if a single path is passed this value is ignored
     * @returns A Promise with the [[Container]] object created
     */
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
    /**
     * Loads the provided json with a GET request. The content will be used to create a [[Container]] object.
     * This method is async, so if you need a callback refer to JavaScript function `fetch`
     * @param id the particles container element id
     * @param domContainer the container used to contains the particles
     * @param jsonUrl the json path (or paths array) to use in the GET request
     * @param index the index of the paths array, if a single path is passed this value is ignored
     * @returns A Promise with the [[Container]] object created
     */
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
    /**
     * Adds an additional click handler to all the loaded [[Container]] objects.
     * @param callback the function called after the click event is fired
     */
    setOnClickHandler(callback) {
        const dom = this.dom();
        if (!dom.length) {
            throw new Error("Can only set click handlers after calling tsParticles.load() or tsParticles.loadJSON()");
        }
        for (const domItem of dom) {
            domItem.addClickHandler(callback);
        }
    }
    /**
     * Adds a listener to the specified event
     * @param type The event to listen to
     * @param listener The listener of the specified event
     */
    addEventListener(type, listener) {
        __classPrivateFieldGet(this, _Loader_engine, "f").eventDispatcher.addEventListener(type, listener);
    }
    /**
     * Removes a listener from the specified event
     * @param type The event to stop listening to
     * @param listener The listener of the specified event
     */
    removeEventListener(type, listener) {
        __classPrivateFieldGet(this, _Loader_engine, "f").eventDispatcher.removeEventListener(type, listener);
    }
    /**
     * Dispatches an event that will be listened from listeners
     * @param type The event to dispatch
     * @param args The event parameters
     */
    dispatchEvent(type, args) {
        __classPrivateFieldGet(this, _Loader_engine, "f").eventDispatcher.dispatchEvent(type, args);
    }
}
_Loader_engine = new WeakMap();
