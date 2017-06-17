import { LifecycleClass } from 'inferno-shared';
import { IVNode } from './vnode';

// FiberFLags are used to describe shape of its vNode
// Flags are used for internal optimizations
// TODO: Implement this to reduce diffing overhead
const enum FiberFlags {
  Text = 1,

  HasNoChildren = 1 << 1, // Has no children at all, or only invalid children
  HasKeyedChildren = 1 << 2, // data is optimized for keyed algorithm
  HasSingleChildren = 1 << 3, // Single Element children

  hasEvents = 1 << 4, // This fiber has DOM events (TODO: Move to property?)

}

export interface IFiber {
	input: IVNode|string|number;
	children: null|IFiber|IFiber[];
	dom: null|Element;
	lifeCycle: LifecycleClass;
  // Non keyed index or keyed key
	i: string|number;
	// c is possible component instance
	c: any;
}

/**
 * Fiber represents internal vNode tree, which holds the reference to actual DOM.
 * This way user land virtual nodes become stateless and can be moved / hoisted / swapped freely at application level
 * @param {object|string|number} input reference to vNode or string of this Fiber
 * @param {string} i location of current Fiber in fiber tree
 * @constructor
 */
export function Fiber(input, i) {
	this.input = input;
	this.dom = null;
	this.children = null; // This value is null for Fibers that hold text nodes
	this.lifeCycle = null;
	this.i = i;
	this.c = null;
}
