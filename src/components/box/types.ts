import React from 'react';

export interface AggregatorItemProps {
  label: string;
  value: string;
}

export interface AggregatorHeadProps {
  label: string;
  value: React.ReactNode;
}

export interface AggregatorBoxProps {
  items: AggregatorItemProps[];
  head: AggregatorHeadProps;
  isSelected: boolean;
  onClick?: VoidFunction;
}

export interface SingleItemBoxProps {
  value: number | null;
  src?: string;
  label: string;
  href?: string;
  leftBox?: React.ReactNode;
}

export interface ListItemsProps {
  item: AggregatorItemProps;
}
