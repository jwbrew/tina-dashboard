//
//  PusherNotifications.h
//  dashboard
//
//  Created by James Bradley on 30/11/2016.
//  Copyright © 2016 Facebook. All rights reserved.
//

#ifndef PusherNotifications_h
#define PusherNotifications_h

#import "RCTBridgeModule.h"

@interface PusherNotifications : NSObject <RCTBridgeModule, PTPusherDelegate>
@property (nonatomic, strong) AppDelegate *appDelegate;
@property (nonatomic, strong) PTPusher *pusher;

@end


#endif /* PusherNotifications_h */
