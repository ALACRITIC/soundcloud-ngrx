import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { List } from 'immutable';
import { Observable } from 'rxjs/Observable';
import { PlayerState, TimesState } from 'src/core/player';
import { Tracklist } from 'src/core/tracklists';
import { Track } from 'src/core/tracks';
import { LoadingIndicatorComponent } from '../loading-indicator';
import { TrackCardComponent } from '../track-card';


@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  directives: [
    LoadingIndicatorComponent,
    TrackCardComponent
  ],
  selector: 'tracklist-items',
  styles: [
    require('./tracklist-items.scss')
  ],
  template: `
    <div *ngIf="tracklist" class="g-row tracklist-items">
      <track-card
        *ngFor="let track of tracks | async"
        class="g-col"
        [isPlaying]="track.id === player.trackId && player.isPlaying"
        [isSelected]="track.id === player.trackId"
        [times]="times"
        [track]="track"
        (pause)="pause.emit()"
        (play)="track.id === player.trackId ? play.emit() : select.emit({trackId: track.id, tracklistId: tracklist.id})"
        (seek)="seek.emit($event)"></track-card>
    </div>

    <loading-indicator *ngIf="tracklist.isPending || tracklist.hasNextPage"></loading-indicator>
  `
})

export class TracklistItemsComponent {
  @Input() player: PlayerState;
  @Input() times: Observable<TimesState>;
  @Input() tracklist: Tracklist;
  @Input() tracks: Observable<List<Track>>;

  @Output() pause = new EventEmitter(false);
  @Output() play = new EventEmitter(false);
  @Output() seek = new EventEmitter(false);
  @Output() select = new EventEmitter(false);
}
