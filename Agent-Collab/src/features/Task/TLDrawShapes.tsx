import { Text } from '@radix-ui/themes'
import { useState } from 'react'
import { DefaultColorStyle, RecordProps, Rectangle2d, TLBaseShape, T, TLDefaultFillStyle, DefaultFillStyle, getDefaultColorTheme } from 'tldraw'
import { HTMLContainer, ShapeUtil } from 'tldraw'
import { TLDefaultColorStyle } from 'tldraw'
import { createShapePropsMigrationIds, createShapePropsMigrationSequence } from 'tldraw'

const versions = createShapePropsMigrationIds(
	// this must match the shape type in the shape definition
	'note',
	{
		AddSomeProperty: 1,
	}
)

// Migrations for the custom card shape (optional but very helpful)
export const cardShapeMigrations = createShapePropsMigrationSequence({
	sequence: [
		{
			id: versions.AddSomeProperty,
			up(props) {
				// it is safe to mutate the props object here
				props.someProperty = 'some value'
			},
			down(props) {
				delete props.someProperty
			},
		},
	],
})

// A type for our custom card shape
export type ICardShape = TLBaseShape<
	'note',
	{
		w: number
		h: number
		color: TLDefaultColorStyle
		fill: TLDefaultFillStyle
		title: string
		description: string
		assignedTo: string
		completed: boolean
		commentary: string
		//richText: 
	}
>

export const cardShapeProps: RecordProps<ICardShape> = {
	w: T.number,
	h: T.number,
	color: DefaultColorStyle,
	fill: DefaultFillStyle,
	title: T.string,
	description: T.string,
	assignedTo: T.string,
	completed: T.boolean,
	commentary: T.string
}


class CardShapeUtil extends ShapeUtil<ICardShape> {
	static override type = 'note' as const
	// [1]
	static override props = cardShapeProps
	// [2]
	static override migrations = cardShapeMigrations

	// [4]
	getDefaultProps(): ICardShape['props'] {
		return {
			w: 200,
			h: 200,
			color: 'red',
			fill: "solid",
			title: "Titre",
			description: "Description",
			assignedTo: "Assigné à",
			completed: false,
			commentary: "Commentaire"
		}
	}

	getGeometry(shape: ICardShape) {
		return new Rectangle2d({
			width: shape.props.w,
			height: shape.props.h,
			isFilled: true,
		})
	}

	component(shape: ICardShape) {
		const bounds = this.editor.getShapeGeometry(shape).bounds
		const theme = getDefaultColorTheme({ isDarkMode: this.editor.user.getIsDarkMode() })

		//[a]
		// eslint-disable-next-line react-hooks/rules-of-hooks

		return (
			<HTMLContainer
				id={shape.id}
				style={{
					border: '1px solid black',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',
					pointerEvents: 'all',
					backgroundColor: theme[shape.props.color].semi,
					color: theme[shape.props.color].solid,
				}}
			>
				<Text size="5">{shape.props.title}</Text>
				<Text size="2">{shape.props.description}</Text>
				<Text size="2">{shape.props.assignedTo}</Text>
				<Text size="2">{shape.props.completed ? "Terminé" : "En cours"}</Text>
				<Text size="2">{shape.props.commentary}</Text>
				
			</HTMLContainer>
		)
	}

	indicator(shape: ICardShape) {
		return <rect width={shape.props.w} height={shape.props.h} />
	}
}

export const TLCustomShapes = [CardShapeUtil]