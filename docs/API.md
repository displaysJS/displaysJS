<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

### Table of Contents

-   [on](#on)
-   [MODES](#modes)
-   [setAsReady](#setasready)
-   [ready](#ready)
-   [setAsPrimaryDisplay](#setasprimarydisplay)
-   [isPrimaryDisplay](#isprimarydisplay)
-   [tick](#tick)
-   [seek](#seek)
-   [enableUserMode](#enableusermode)
-   [releaseUserMode](#releaseusermode)
-   [isInUserMode](#isinusermode)
-   [handleTick](#handletick)
-   [handlePause](#handlepause)
-   [TimeAction](#timeaction)

## on

Handle case where a display is not in sync or
needs all other displays to pause.\*

## MODES

MODES is different modes a display may have
Normal is the default Display mode
User is a state where user is interacting with the Display instance
      Note: Implementation depends on Display

## setAsReady

This function set's the Display instance as being ready.

## ready

This is just a getter to check if the dislay ready.

## setAsPrimaryDisplay

This set's the display as being the primary display.

## isPrimaryDisplay

This is a getter to check if a display is the primary display

## tick

Note: Tick should dependent per display.
      By default it ticks by 1 however it can be overwritten
      by a display implementation.
      \*\*\* Only Primary Display should tick.

## seek

Seek skips to a given time.

**Parameters**

-   `t`  

## enableUserMode

-   Helper to enable user mode
    Only use this if UserMode is needed

## releaseUserMode

-   Helper to disable user mode
    Only use this if UserMode is used

## isInUserMode

Getter to check if in UserMode

## handleTick

Listener for tick actions
Handles call to Timeline for current tick.

## handlePause

Listener for pause action
Handles call to Timeline for current tick.

## TimeAction

Class representing a time action.

**Parameters**

-   `func`  
-   `args`  
-   `name`   (optional, default `"undefined"`)