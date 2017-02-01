( function() {
	'use strict';

	/**
	 * Base class for RTF model entries.
	 *
	 * @class Model
	 */
	class Model {
		/**
		 * Creates an instance of Model.
		 *
		 * @param {Model/null} parent
		 * @memberOf Model
		 */
		constructor( parent ) {
			this.children = [];
			this._parent = parent || null;
		}

		append( node ) {
			this.children.push( node );

			node.setParent( this );
		}

		setParent( parent ) {
			this._parent = parent;
		}

		/**
		 * @returns {Model/null} Returns last child of this item or `null` if none.
		 * @memberOf Model
		 */
		getLast() {
			return this.children[ this.children.length - 1 ] || null;
		}
	}

	module.exports = Model;
} )();
