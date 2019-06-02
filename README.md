# staruml-gosu
Gosu Extension for StarUML 2
============================

This extension for StarUML(http://staruml.io) support to generate Gosu code from UML model. Install this extension from Extension Manager of StarUML. It is based on Gosu 1.14 specification.

Gosu Code Generation
--------------------

1. Click the menu (`Tools > Gosu > Generate Code...`)
2. Select a base model (or package) that will be generated to Gosu.
3. Select a folder where generated Java source files will be placed.

Belows are the rules to convert from UML model elements to Gosu source codes.

### UMLPackage

* converted to _Gosu Package_ (as a folder).

### UMLClass

* converted to _Gosu Class_. (as a separate `.gs` file)
* `visibility` to one of modifiers `public`, `protected`, `private` and none.
* `isAbstract` property to `abstract` modifier.
* `isFinalSpecialization` and `isLeaf` property to `final` modifier.
* Default constructor is generated.
* All contained types (_UMLClass_, _UMLInterface_, _UMLEnumeration_) are generated as inner type definition.
* Documentation property to JavaDoc comment.
* Enhancement will be generated if a class is steriotypes as `Enhancement`

### UMLAttribute

* converted to _Gosu Field_.
* `visibility` property to one of modifiers `public`, `protected`, `private` and none.
* `name` property to field identifier.
* `type` property to field type.
* `multiplicity` property to array type.
* `isStatic` property to `static` modifier.
* `isLeaf` property to `final` modifier.
* `defaultValue` property to initial value.
* Documentation property to JavaDoc comment.

### UMLOperation

* converted to _Gosu Methods_.
* `visibility` property to one of modifiers `public`, `protected`, `private` and none.
* `name` property to method identifier.
* `isAbstract` property to `abstract` modifier.
* `isStatic` property to `static` modifier.
* _UMLParameter_ to _Gosu Method Parameters_.
* _UMLParameter_'s name property to parameter identifier.
* _UMLParameter_'s type property to type of parameter.
* _UMLParameter_ with `direction` = `return` to return type of method.
* _UMLParameter_ with `isReadOnly` = `true` to `readonly` modifier will be added in Property accessor.
* All member fields will be start with `_`.
* Attribute name will not change if name is in all caps.
* If field name starts with Upper case letter, Gosu accessor property will be generated.
* Documentation property to JavaDoc comment.

### UMLInterface

* converted to _Gosu Interface_.  (as a separate `.gs` file)
* `visibility` property to one of modifiers `public`, `protected`, `private` and none.
* Documentation property to JavaDoc comment.

### UMLEnumeration

* converted to _Gosu Enum_.  (as a separate `.gs` file)
* `visibility` property to one of modifiers `public`, `protected`, `private` and none.
* _UMLEnumerationLiteral_ to literals of enum.

### UMLAssociationEnd

* converted to _Gosu Field_.
* `visibility` property to one of modifiers `public`, `protected`, `private` and none.
* `name` property to field identifier.
* `type` property to field type.
* If `multiplicity` is one of `0..*`, `1..*`, `*`, then collection type (`java.util.List<>` when `isOrdered` = `true` or `java.util.Set<>`) is used.
* `defaultValue` property to initial value.
* Documentation property to JavaDoc comment.

### UMLGeneralization

* converted to _Gosu Extends_ (`extends`).
* Allowed only for _UMLClass_ to _UMLClass_, and _UMLInterface_ to _UMLInterface_.

### UMLInterfaceRealization

* converted to _Gosu Implements_ (`implements`).
* Allowed only for _UMLClass_ to _UMLInterface_.

