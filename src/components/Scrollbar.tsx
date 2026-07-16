/* eslint-disable prettier/prettier */

import React, { forwardRef } from 'react';
import Scrollbars, {
  type ScrollbarProps as CustomScrollbarProps,
  type positionValues,
} from 'react-custom-scrollbars-2';

type ScrollbarProps = {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  autoHide?: boolean;
  autoHideTimeout?: number;
  autoHideDuration?: number;
  autoHeight?: boolean;
  autoHeightMin?: number | string;
  autoHeightMax?: number | string;
  hideTracksWhenNotNeeded?: boolean;
  onScrollFrame?: (values: positionValues) => void;
  viewClassName?: string;
};

const noop = () => {};

const Scrollbar = forwardRef<Scrollbars, ScrollbarProps>(
  (
    {
      style,
      className,
      autoHide = false,
      autoHideTimeout = 0,
      autoHideDuration = 0,
      autoHeight = false,
      autoHeightMin,
      autoHeightMax,
      hideTracksWhenNotNeeded = true,
      onScrollFrame = noop,
      children,
      viewClassName = '',
    },
    ref,
  ) => {
    const renderView: CustomScrollbarProps['renderView'] = (viewProps: any) => (
      <div
        {...viewProps}
        style={{ ...viewProps?.style }} //, marginRight: -17, marginBottom: -16 }}
        className={`view ${viewClassName}`}
      />
    );

    const renderThumbVertical: CustomScrollbarProps['renderThumbVertical'] = (thumbProps: any) => (
      <div {...thumbProps} className="thumb-view" />
    );

    const renderThumbHorizontal: CustomScrollbarProps['renderThumbHorizontal'] = (
      thumbProps: any,
    ) => <div {...thumbProps} className="thumb-view thumb-view-horizontal" />;

    return (
      <Scrollbars
        style={{ width: '100%', ...style }}
        renderView={renderView}
        renderThumbVertical={renderThumbVertical}
        renderThumbHorizontal={renderThumbHorizontal}
        className={['ScrollbarsSidebar', className, 'overflow-hidden'].filter(Boolean).join(' ')}
        ref={ref}
        autoHide={autoHide}
        autoHideTimeout={autoHideTimeout}
        autoHideDuration={autoHideDuration}
        autoHeight={autoHeight}
        autoHeightMin={autoHeightMin}
        autoHeightMax={autoHeightMax}
        hideTracksWhenNotNeeded={hideTracksWhenNotNeeded}
        onScrollFrame={onScrollFrame}
        universal
      >
        {children}
      </Scrollbars>
    );
  },
);

Scrollbar.displayName = 'Scrollbar';

export default Scrollbar;
