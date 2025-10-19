import protobuf from 'protobufjs';
import type { User } from '@/types/user';

// Define the proto schema inline
const protoSchema = `
syntax = "proto3";

package userpackage;

message User {
  string id = 1;
  string email = 2;
  string role = 3;
  string status = 4;
  string createdAt = 5;
}

message UserList {
  repeated User users = 1;
}
`;

/**
 * Decode Protobuf binary data to user list
 */
export async function decodeProtobufUsers(buffer: ArrayBuffer): Promise<User[]> {
  try {
    // Parse the proto schema
    const root = protobuf.parse(protoSchema).root;
    
    // Get the UserList message type
    const UserList = root.lookupType('userpackage.UserList');
    
    // Decode the binary data
    const uint8Array = new Uint8Array(buffer);
    const message = UserList.decode(uint8Array);
    
    // Convert to plain object
    const object = UserList.toObject(message, {
      longs: String,
      enums: String,
      bytes: String,
    });
    
    // Return the users array
    return object.users as User[];
  } catch (error) {
    console.error('Error decoding protobuf:', error);
    throw new Error('Failed to decode protobuf data');
  }
}
