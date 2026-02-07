import repeatModeConst from "@/constants/repeatModeConst";
import rpx from "@/utils/rpx";
import React from "react";
import { InteractionManager, StyleSheet, View } from "react-native";

import Icon from "@/components/base/icon.tsx";
import { showPanel } from "@/components/panels/usePanel";
import TrackPlayer, { useMusicState, useRepeatMode } from "@/core/trackPlayer";
import useOrientation from "@/hooks/useOrientation";
import delay from "@/utils/delay";
import { musicIsPaused } from "@/utils/trackUtils";
import { useI18N } from "@/core/i18n";

export default function () {
    const repeatMode = useRepeatMode();
    const musicState = useMusicState();
    const { t } = useI18N();

    const orientation = useOrientation();

    console.log(repeatMode, repeatModeConst[repeatMode]);

    return (
        <>
            <View
                style={[
                    style.wrapper,
                    orientation === "horizontal"
                        ? {
                            marginTop: 0,
                        }
                        : null,
                ]}>
                <Icon
                    accessible
                    accessibilityLabel={t("a11y.musicDetail.repeatMode", {
                        mode: t(repeatModeConst[repeatMode].i18nKey),
                    })}
                    accessibilityRole="button"
                    color={"white"}
                    name={repeatModeConst[repeatMode].icon}
                    size={rpx(56)}
                    onPress={async () => {
                        InteractionManager.runAfterInteractions(async () => {
                            await delay(20, false);
                            TrackPlayer.toggleRepeatMode();
                        });
                    }}
                />
                <Icon
                    accessible
                    accessibilityLabel={t("a11y.musicDetail.previous")}
                    accessibilityRole="button"
                    color={"white"}
                    name={"skip-left"}
                    size={rpx(56)}
                    onPress={() => {
                        TrackPlayer.skipToPrevious();
                    }}
                />
                <Icon
                    accessible
                    accessibilityLabel={t("a11y.musicDetail.playPause", {
                        playing: musicIsPaused(musicState)
                            ? t("a11y.musicDetail.paused")
                            : t("a11y.musicDetail.playing"),
                    })}
                    accessibilityRole="button"
                    color={"white"}
                    name={musicIsPaused(musicState) ? "play" : "pause"}
                    size={rpx(96)}
                    onPress={() => {
                        if (musicIsPaused(musicState)) {
                            TrackPlayer.play();
                        } else {
                            TrackPlayer.pause();
                        }
                    }}
                />
                <Icon
                    accessible
                    accessibilityLabel={t("a11y.musicDetail.next")}
                    accessibilityRole="button"
                    color={"white"}
                    name={"skip-right"}
                    size={rpx(56)}
                    onPress={() => {
                        TrackPlayer.skipToNext();
                    }}
                />
                <Icon
                    accessible
                    accessibilityLabel={t("common.sheet")}
                    accessibilityRole="button"
                    color={"white"}
                    name={"playlist"}
                    size={rpx(56)}
                    onPress={() => {
                        showPanel("PlayList");
                    }}
                />
            </View>
        </>
    );
}

const style = StyleSheet.create({
    wrapper: {
        width: "100%",
        marginTop: rpx(36),
        height: rpx(100),
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
    },
});
