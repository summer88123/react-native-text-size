# Copyright (c) Meta Platforms, Inc. and affiliates.
#
# This source code is licensed under the MIT license found in the
# LICENSE file in the root directory of this source tree.

cmake_minimum_required(VERSION 3.13)
set(CMAKE_VERBOSE_MAKEFILE on)

file(GLOB rnoh_text_size_SRC CONFIGURE_DEPENDS *.cpp)
add_library(rnoh_text_size SHARED ${rnoh_text_size_SRC})
target_include_directories(rnoh_text_size PUBLIC ${CMAKE_CURRENT_SOURCE_DIR})
target_link_libraries(rnoh_text_size PUBLIC rnoh)
