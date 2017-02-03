( function() {
	'use strict';

	let isClass = require( 'is-class' );

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

		/**
		 * Returns the first child matching `criteria`.
		 *
		 *		// Returns a first child which is instance of Group.
		 *		curModel.getChild( Group );
		 *
		 * @param {Class/Function} [criteria] If no criteria is given the first child is returned.
		 * @param {Boolean} [recursive=false]
		 * @returns {Model}
		 * @memberOf Model
		 */
		getChild( criteria, recursive ) {
			let evaluator;

			if ( !criteria ) {
				evaluator = () => true;
			} else if ( isClass( criteria ) ) {
				evaluator = val => val instanceof criteria;
			} else if ( typeof criteria === 'function' ) {
				evaluator = criteria;
			}

			for ( let child of this._getChildren( this, recursive ) ) {
				if ( evaluator( child ) === true ) {
					return child;
				}
			}

			return null;
		}

		/**
		 * Returns an array of children matching `criteria`.
		 *
		 *		// Returns a first child which is instance of Group.
		 *		curModel.getChild( Group );
		 *
		 * @param {Class/Function} [criteria] If no criteria is given the first child is returned.
		 * @param {Boolean} [recursive=false]
		 * @returns {Model}
		 * @memberOf Model
		 */
		getChildren( criteria, recursive ) {
			let ret = [],
				evaluator;

			if ( !criteria ) {
				evaluator = () => true;
			} else if ( isClass( criteria ) ) {
				evaluator = val => val instanceof criteria;
			} else if ( typeof criteria === 'function' ) {
				evaluator = criteria;
			}

			for ( let child of this._getChildren( this, recursive ) ) {
				if ( evaluator( child ) === true ) {
					ret.push( child );
				}
			}

			return ret;
		}

		* _getChildren( parent, recursive ) {
			for ( let child of parent.children ) {
				yield child;
				if ( recursive ) {
					for ( let grandchildren of child.children ) {
						yield grandchildren;
					}
				}
			}
		}
	}

	module.exports = Model;
} )();
