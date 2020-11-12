package main

var favAry = [...]byte{0, 0, 1, 0, 1, 0, 16, 16, 0, 0, 1, 0, 32, 0, 104, 4, 0, 0, 22, 0, 0, 0, 40, 0, 0, 0, 16, 0, 0, 0, 32, 0, 0, 0, 1, 0, 32, 0, 0, 0, 0, 0, 0, 4, 0, 0, 19, 11, 0, 0, 19, 11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 235, 81, 102, 229, 235, 81, 102, 242, 235, 81, 102, 242, 235, 85, 105, 242, 234, 74, 96, 242, 232, 53, 77, 242, 235, 82, 103, 242, 233, 67, 90, 242, 232, 58, 81, 242, 235, 79, 100, 242, 232, 55, 80, 242, 235, 78, 99, 242, 236, 88, 108, 242, 232, 59, 83, 242, 233, 62, 85, 242, 236, 86, 107, 229, 235, 81, 102, 255, 235, 81, 102, 255, 235, 81, 102, 255, 234, 75, 97, 255, 236, 90, 110, 255, 241, 137, 151, 255, 234, 74, 95, 255, 238, 107, 125, 255, 240, 122, 138, 255, 236, 88, 108, 255, 241, 137, 151, 255, 234, 70, 92, 255, 231, 46, 71, 255, 240, 119, 136, 255, 241, 131, 146, 255, 234, 70, 92, 255, 235, 81, 102, 242, 235, 81, 102, 255, 235, 81, 102, 255, 232, 52, 77, 255, 241, 134, 149, 255, 255, 255, 255, 255, 235, 83, 103, 255, 246, 181, 190, 255, 255, 255, 255, 255, 236, 85, 106, 255, 255, 252, 252, 255, 242, 145, 158, 255, 235, 79, 101, 255, 255, 251, 252, 255, 247, 186, 194, 255, 231, 46, 72, 242, 235, 81, 102, 242, 235, 81, 102, 255, 235, 81, 102, 255, 231, 47, 72, 255, 244, 161, 172, 255, 255, 255, 255, 255, 240, 130, 145, 255, 246, 176, 186, 255, 255, 255, 255, 255, 235, 82, 103, 255, 247, 189, 197, 255, 254, 242, 244, 255, 251, 220, 224, 255, 255, 255, 255, 255, 237, 96, 115, 255, 233, 64, 87, 242, 235, 81, 102, 242, 235, 81, 102, 255, 235, 79, 101, 255, 232, 57, 80, 255, 248, 193, 201, 255, 253, 239, 241, 255, 248, 197, 204, 255, 245, 171, 181, 255, 253, 237, 240, 255, 241, 131, 146, 255, 244, 158, 170, 255, 246, 176, 186, 255, 241, 131, 145, 255, 252, 236, 238, 255, 233, 60, 84, 255, 235, 78, 100, 242, 235, 81, 102, 242, 235, 81, 102, 255, 234, 73, 95, 255, 235, 84, 104, 255, 251, 224, 228, 255, 242, 146, 159, 255, 255, 255, 255, 255, 247, 186, 194, 255, 244, 166, 177, 255, 247, 189, 197, 255, 238, 112, 129, 255, 249, 206, 213, 255, 249, 203, 209, 255, 247, 187, 196, 255, 231, 45, 70, 255, 235, 82, 103, 242, 235, 81, 102, 242, 235, 81, 102, 255, 232, 57, 81, 255, 241, 137, 151, 255, 255, 255, 255, 255, 233, 65, 88, 255, 255, 255, 255, 255, 247, 190, 198, 255, 237, 99, 118, 255, 254, 248, 249, 255, 235, 83, 103, 255, 255, 255, 255, 255, 255, 255, 255, 255, 238, 110, 127, 255, 232, 56, 80, 255, 235, 81, 102, 242, 235, 81, 102, 242, 235, 81, 102, 255, 234, 70, 92, 255, 239, 112, 129, 255, 242, 138, 152, 255, 233, 62, 85, 255, 240, 127, 143, 255, 238, 111, 129, 255, 234, 73, 95, 255, 242, 141, 155, 255, 235, 83, 104, 255, 241, 131, 145, 255, 242, 147, 160, 255, 234, 76, 97, 255, 235, 78, 99, 255, 235, 81, 102, 242, 235, 81, 102, 242, 235, 81, 102, 255, 235, 85, 106, 255, 234, 70, 93, 255, 232, 55, 79, 255, 236, 85, 106, 255, 232, 57, 81, 255, 233, 66, 89, 255, 235, 80, 101, 255, 232, 55, 79, 255, 235, 80, 101, 255, 232, 57, 81, 255, 232, 52, 76, 255, 235, 79, 100, 255, 235, 84, 104, 255, 235, 81, 102, 242, 235, 81, 102, 242, 235, 81, 102, 255, 235, 81, 102, 255, 235, 81, 102, 255, 235, 81, 102, 255, 235, 81, 102, 255, 235, 81, 102, 255, 235, 81, 102, 255, 235, 81, 102, 255, 235, 81, 102, 255, 235, 81, 102, 255, 235, 81, 102, 255, 235, 81, 102, 255, 235, 81, 102, 255, 235, 81, 102, 255, 235, 81, 102, 242, 235, 81, 102, 242, 235, 81, 102, 255, 235, 81, 102, 255, 235, 81, 102, 255, 235, 81, 102, 255, 235, 81, 102, 255, 235, 81, 102, 255, 235, 81, 102, 255, 235, 81, 102, 255, 235, 81, 102, 255, 235, 81, 102, 255, 235, 81, 102, 255, 235, 81, 102, 255, 235, 81, 102, 255, 235, 81, 102, 255, 235, 81, 102, 242, 235, 81, 102, 242, 235, 81, 102, 255, 235, 81, 102, 255, 235, 81, 102, 255, 235, 81, 102, 255, 235, 81, 102, 255, 235, 81, 102, 255, 235, 81, 102, 255, 235, 81, 102, 255, 235, 81, 102, 255, 235, 81, 102, 255, 235, 81, 102, 255, 235, 81, 102, 255, 235, 81, 102, 255, 235, 81, 102, 255, 235, 81, 102, 242, 235, 81, 102, 242, 235, 81, 102, 255, 235, 81, 102, 255, 235, 81, 102, 255, 235, 81, 102, 255, 235, 81, 102, 255, 235, 82, 103, 255, 234, 72, 94, 255, 234, 73, 95, 255, 235, 82, 103, 255, 235, 81, 102, 255, 235, 81, 102, 255, 235, 81, 102, 255, 235, 81, 102, 255, 235, 81, 102, 255, 235, 81, 102, 242, 235, 81, 102, 242, 235, 81, 102, 255, 235, 81, 102, 255, 235, 81, 102, 255, 235, 81, 102, 255, 235, 85, 105, 255, 233, 61, 85, 255, 234, 76, 98, 255, 234, 76, 98, 255, 233, 61, 85, 255, 235, 85, 105, 255, 235, 81, 102, 255, 235, 81, 102, 255, 235, 81, 102, 255, 235, 81, 102, 255, 235, 81, 102, 242, 235, 81, 102, 255, 235, 81, 102, 255, 235, 81, 102, 255, 235, 81, 102, 255, 235, 81, 102, 255, 233, 61, 84, 255, 239, 116, 133, 255, 252, 228, 231, 255, 252, 227, 231, 255, 239, 114, 131, 255, 233, 61, 84, 255, 235, 81, 103, 255, 235, 81, 102, 255, 235, 81, 102, 255, 235, 81, 102, 255, 235, 81, 102, 255, 235, 81, 102, 229, 235, 81, 102, 242, 235, 81, 102, 242, 235, 81, 102, 242, 235, 76, 98, 242, 233, 60, 84, 242, 252, 226, 229, 242, 255, 255, 255, 242, 255, 255, 255, 242, 251, 224, 228, 242, 232, 59, 83, 242, 235, 76, 98, 242, 235, 81, 102, 242, 235, 81, 102, 242, 235, 81, 102, 242, 235, 81, 102, 229, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0}
